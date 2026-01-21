const fs = require('fs').promises;
const path = require('path');
const semver = require('semver');

class PeerDependencyAnalyzer {
    constructor(projectPath, options = {}) {
        this.projectPath = projectPath;
        this.options = options;
        this.installedPackages = new Map();
        this.peerDependencyGraph = new Map();
    }

    async analyze() {
        // Load all installed packages
        await this.loadInstalledPackages();

        // Analyze peer dependencies for all packages
        const analysis = {
            summary: {
                totalPackages: this.installedPackages.size,
                packagesWithPeerDeps: 0,
                totalPeerDeps: 0,
                conflicts: 0,
                missing: 0,
                compatible: 0
            },
            packages: [],
            conflicts: [],
            missing: [],
            recommendations: []
        };

        for (const [packageName, packageInfo] of this.installedPackages) {
            const peerAnalysis = await this.analyzePackagePeerDeps(packageName, packageInfo);

            if (peerAnalysis.peerDependencies.length > 0) {
                analysis.summary.packagesWithPeerDeps++;
                analysis.summary.totalPeerDeps += peerAnalysis.peerDependencies.length;
                analysis.packages.push(peerAnalysis);

                // Track missing dependencies
                analysis.missing.push(...peerAnalysis.missing);

                // Track conflicts
                analysis.conflicts.push(...peerAnalysis.conflicts);

                // Track compatible dependencies
                analysis.summary.compatible += peerAnalysis.peerDependencies.filter(
                    dep => dep.isCompatible
                ).length;
            }
        }

        // Analyze cross-package conflicts
        const crossPackageConflicts = await this.analyzeCrossPackageConflicts();
        analysis.conflicts.push(...crossPackageConflicts);
        analysis.summary.conflicts = analysis.conflicts.length;

        // Generate recommendations
        analysis.recommendations = this.generateRecommendations(analysis);

        return analysis;
    }

    async analyzePackagePeerDeps(packageName, packageInfo) {
        const packageJson = packageInfo.packageJson;
        const peerDeps = packageJson.peerDependencies || {};
        const peerDepsMeta = packageJson.peerDependenciesMeta || {};

        const analysis = {
            name: packageName,
            version: packageInfo.version,
            peerDependencies: [],
            missing: [],
            conflicts: []
        };

        for (const [peerName, requiredVersion] of Object.entries(peerDeps)) {
            const meta = peerDepsMeta[peerName] || {};
            const isOptional = meta.optional === true;

            const peerDepInfo = {
                name: peerName,
                requiredVersion,
                isOptional,
                installed: false,
                installedVersion: null,
                isCompatible: false,
                multipleVersions: []
            };

            // Check if peer dependency is installed
            const installedInfo = this.installedPackages.get(peerName);
            if (installedInfo) {
                peerDepInfo.installed = true;
                peerDepInfo.installedVersion = installedInfo.version;
                peerDepInfo.isCompatible = this.checkVersionCompatibility(
                    requiredVersion,
                    installedInfo.version
                );

                // Check for multiple versions
                const allVersions = await this.getAllInstalledVersions(peerName);
                peerDepInfo.multipleVersions = allVersions;

                // Detect conflicts
                if (!peerDepInfo.isCompatible && !isOptional) {
                    analysis.conflicts.push({
                        package: packageName,
                        peerDependency: peerName,
                        required: requiredVersion,
                        installed: installedInfo.version,
                        severity: 'high'
                    });
                }
            } else if (!isOptional) {
                // Missing required peer dependency
                analysis.missing.push({
                    package: packageName,
                    peerDependency: peerName,
                    requiredVersion,
                    severity: 'high'
                });
            }

            analysis.peerDependencies.push(peerDepInfo);
        }

        return analysis;
    }

    async loadInstalledPackages() {
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        try {
            const items = await fs.readdir(nodeModulesPath, { withFileTypes: true });

            for (const item of items) {
                if (item.isDirectory() && !item.name.startsWith('.')) {
                    // Handle scoped packages
                    if (item.name.startsWith('@')) {
                        const scopeDir = path.join(nodeModulesPath, item.name);
                        const scopeItems = await fs.readdir(scopeDir, { withFileTypes: true });

                        for (const scopeItem of scopeItems) {
                            if (scopeItem.isDirectory()) {
                                await this.loadPackage(
                                    path.join(scopeDir, scopeItem.name),
                                    `${item.name}/${scopeItem.name}`
                                );
                            }
                        }
                    } else {
                        await this.loadPackage(
                            path.join(nodeModulesPath, item.name),
                            item.name
                        );
                    }
                }
            }
        } catch (error) {
            // node_modules might not exist
        }
    }

    async loadPackage(packagePath, packageName) {
        const packageJsonPath = path.join(packagePath, 'package.json');

        try {
            const content = await fs.readFile(packageJsonPath, 'utf-8');
            const packageJson = JSON.parse(content);

            this.installedPackages.set(packageName, {
                name: packageName,
                version: packageJson.version,
                packageJson,
                path: packagePath
            });
        } catch (error) {
            // Skip invalid packages
        }
    }

    async getAllInstalledVersions(packageName) {
        const versions = [];
        const packageInfo = this.installedPackages.get(packageName);

        if (packageInfo) {
            versions.push(packageInfo.version);
        }

        // Also check for duplicate installations in subdirectories
        // This is simplified - in practice you'd need to traverse the entire node_modules tree
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        try {
            const items = await fs.readdir(nodeModulesPath, { withFileTypes: true });

            for (const item of items) {
                if (item.isDirectory() && !item.name.startsWith('@') && item.name !== packageName) {
                    // Check if this package has the target as a dependency
                    const depPath = path.join(nodeModulesPath, item.name, 'node_modules', packageName);
                    if (await this.directoryExists(depPath)) {
                        const depPackageJson = path.join(depPath, 'package.json');
                        try {
                            const content = await fs.readFile(depPackageJson, 'utf-8');
                            const packageJson = JSON.parse(content);
                            if (!versions.includes(packageJson.version)) {
                                versions.push(packageJson.version);
                            }
                        } catch (error) {
                            // Skip invalid packages
                        }
                    }
                }
            }
        } catch (error) {
            // Ignore traversal errors
        }

        return versions;
    }

    checkVersionCompatibility(requiredRange, installedVersion) {
        try {
            return semver.satisfies(installedVersion, requiredRange);
        } catch (error) {
            // Fallback for complex ranges or invalid versions
            return this.fallbackCompatibilityCheck(requiredRange, installedVersion);
        }
    }

    fallbackCompatibilityCheck(requiredRange, installedVersion) {
        // Handle complex ranges like "^16.8.0 || ^17.0.0 || ^18.0.0"
        const ranges = requiredRange.split('||').map(r => r.trim());

        return ranges.some(range => {
            try {
                return semver.satisfies(installedVersion, range);
            } catch (error) {
                // Basic manual check
                const cleanRequired = range.replace(/^[\^~<>=]/, '');
                const requiredMajor = parseInt(cleanRequired.split('.')[0]);
                const installedMajor = parseInt(installedVersion.split('.')[0]);

                if (range.startsWith('^')) {
                    return requiredMajor === installedMajor;
                }

                if (range.startsWith('~')) {
                    const requiredMinor = parseInt(cleanRequired.split('.')[1]);
                    const installedMinor = parseInt(installedVersion.split('.')[1]);
                    return requiredMajor === installedMajor && requiredMinor === installedMinor;
                }

                return cleanRequired === installedVersion;
            }
        });
    }

    async analyzeCrossPackageConflicts() {
        const conflicts = [];
        const peerRequirements = new Map();

        // Collect all peer dependency requirements
        for (const [packageName, packageInfo] of this.installedPackages) {
            const peerDeps = packageInfo.packageJson.peerDependencies || {};

            for (const [peerName, requiredVersion] of Object.entries(peerDeps)) {
                if (!peerRequirements.has(peerName)) {
                    peerRequirements.set(peerName, []);
                }

                peerRequirements.get(peerName).push({
                    package: packageName,
                    version: packageInfo.version,
                    requiredVersion
                });
            }
        }

        // Check for conflicts
        for (const [peerName, requirements] of peerRequirements) {
            if (requirements.length > 1) {
                const conflict = this.analyzeVersionConflict(peerName, requirements);
                if (conflict) {
                    conflicts.push(conflict);
                }
            }
        }

        return conflicts;
    }

    analyzeVersionConflict(packageName, requirements) {
        // Check if requirements are compatible
        const isCompatible = this.areRequirementsCompatible(requirements);

        if (!isCompatible) {
            return {
                type: 'cross-package-conflict',
                package: packageName,
                requirements,
                severity: 'medium',
                message: `Multiple packages require different versions of ${packageName}`,
                suggestion: this.findCompatibleVersion(requirements)
            };
        }

        return null;
    }

    areRequirementsCompatible(requirements) {
        const versions = requirements.map(req => req.requiredVersion);

        // Try to find a version that satisfies all requirements
        try {
            const range = versions.join(' ');
            return semver.validRange(range);
        } catch (error) {
            // Manual compatibility check
            for (let i = 0; i < versions.length; i++) {
                for (let j = i + 1; j < versions.length; j++) {
                    if (!this.rangesOverlap(versions[i], versions[j])) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    rangesOverlap(range1, range2) {
        try {
            return semver.intersects(range1, range2);
        } catch (error) {
            // Simplified check
            const major1 = this.extractMajorVersion(range1);
            const major2 = this.extractMajorVersion(range2);

            if (range1.startsWith('^') && range2.startsWith('^')) {
                return major1 === major2;
            }

            return true; // Default to assuming overlap
        }
    }

    extractMajorVersion(versionRange) {
        const match = versionRange.match(/[\^~]?(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    findCompatibleVersion(requirements) {
        // Extract all major versions from requirements
        const majorVersions = new Set();

        for (const req of requirements) {
            const major = this.extractMajorVersion(req.requiredVersion);
            if (major > 0) {
                majorVersions.add(major);
            }
        }

        if (majorVersions.size === 1) {
            // All requirements want the same major version
            const major = Array.from(majorVersions)[0];
            return `^${major}.0.0`;
        }

        // Multiple major versions - need manual resolution
        return 'Manual resolution required';
    }

    generateRecommendations(analysis) {
        const recommendations = [];

        // Missing peer dependencies
        if (analysis.missing.length > 0) {
            recommendations.push({
                priority: 'high',
                type: 'install-missing',
                message: `Install ${analysis.missing.length} missing peer dependencies`,
                dependencies: analysis.missing.map(m => ({
                    name: m.peerDependency,
                    version: this.suggestVersion(m.requiredVersion),
                    reason: `Required by ${m.package}`
                }))
            });
        }

        // Version conflicts
        if (analysis.conflicts.length > 0) {
            recommendations.push({
                priority: 'medium',
                type: 'resolve-conflicts',
                message: `Resolve ${analysis.conflicts.length} peer dependency conflicts`,
                conflicts: analysis.conflicts
            });
        }

        // Multiple versions
        const packagesWithMultipleVersions = analysis.packages.filter(
            p => p.peerDependencies.some(dep => dep.multipleVersions.length > 1)
        );

        if (packagesWithMultipleVersions.length > 0) {
            recommendations.push({
                priority: 'low',
                type: 'deduplicate',
                message: 'Consider deduplicating packages with multiple versions',
                packages: packagesWithMultipleVersions
            });
        }

        return recommendations;
    }

    suggestVersion(requiredVersion) {
        // Suggest a specific version based on the requirement
        if (requiredVersion.startsWith('^')) {
            const major = this.extractMajorVersion(requiredVersion);
            if (major > 0) {
                return `^${major}.0.0`;
            }
        }

        return requiredVersion;
    }

    async directoryExists(dirPath) {
        try {
            const stat = await fs.stat(dirPath);
            return stat.isDirectory();
        } catch {
            return false;
        }
    }
}

module.exports = PeerDependencyAnalyzer;