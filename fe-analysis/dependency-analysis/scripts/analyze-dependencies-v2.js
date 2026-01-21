#!/usr/bin/env node

/**
 * Advanced Dependency Analyzer
 * Comprehensive dependency analysis with peer dependency detection, import analysis,
 * and deep dependency tree inspection.
 */

const fs = require('fs').promises;
const path = require('path');

// Import modular analyzers
const ImportAnalyzer = require('./analyzers/import-analyzer');
const PeerDependencyAnalyzer = require('./analyzers/peer-dependency-analyzer');
const PackageUtils = require('./utils/package-utils');

class AdvancedDependencyAnalyzer {
    constructor(projectPath, options = {}) {
        this.projectPath = path.resolve(projectPath);
        this.options = {
            scope: options.scope || 'all',
            checkPeerDependencies: options.checkPeerDependencies !== false,
            checkOutdated: options.checkOutdated || false,
            checkSecurity: options.checkSecurity || false,
            includeDev: options.includeDev !== false,
            generateGraph: options.generateGraph || false,
            maxDepth: options.maxDepth || 5,
            filePattern: options.filePattern || '**/*.{js,jsx,ts,tsx,vue,svelte}',
            ...options
        };

        this.importAnalyzer = new ImportAnalyzer(this.projectPath, this.options);
        this.peerAnalyzer = new PeerDependencyAnalyzer(this.projectPath, this.options);

        this.result = {
            success: true,
            data: {
                summary: {
                    total: 0,
                    unused: 0,
                    missing: 0,
                    phantom: 0,
                    outdated: 0,
                    vulnerable: 0,
                    peerConflicts: 0,
                    circular: 0
                },
                unused: [],
                missing: [],
                phantom: [],
                peerConflicts: [],
                outdated: [],
                vulnerable: [],
                circular: [],
                dependencies: {},
                health: {
                    score: 0,
                    issues: []
                }
            },
            warnings: [],
            metadata: {
                analyzedAt: new Date().toISOString(),
                duration: 0,
                scope: this.options.scope,
                filesAnalyzed: 0
            }
        };
    }

    async analyze() {
        const startTime = Date.now();

        try {
            // Initialize analyzers
            await this.importAnalyzer.initialize();

            // Load package.json
            const packageJson = await this.loadPackageJson();
            if (!packageJson) {
                throw new Error('package.json not found');
            }

            // Get all dependencies
            const dependencies = this.getAllDependencies(packageJson);
            this.result.data.summary.total = dependencies.size;
            this.result.data.dependencies = Object.fromEntries(dependencies);

            // Analyze source files for imports
            await this.analyzeImports();

            // Analyze peer dependencies
            if (this.options.checkPeerDependencies) {
                await this.analyzePeerDependencies();
            }

            // Find unused dependencies
            await this.findUnusedDependencies(dependencies);

            // Find missing dependencies
            await this.findMissingDependencies(dependencies);

            // Find phantom dependencies
            await this.findPhantomDependencies(dependencies);

            // Check for outdated dependencies
            if (this.options.checkOutdated) {
                await this.checkOutdatedDependencies(dependencies);
            }

            // Security vulnerability check
            if (this.options.checkSecurity) {
                await this.checkSecurityVulnerabilities(dependencies);
            }

            // Generate dependency health score
            this.calculateHealthScore();

        } catch (error) {
            this.result.success = false;
            this.result.error = error.message;
        }

        this.result.metadata.duration = Date.now() - startTime;
        return this.result;
    }

    async loadPackageJson() {
        const packageJsonPath = path.join(this.projectPath, 'package.json');
        try {
            const content = await fs.readFile(packageJsonPath, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            return null;
        }
    }

    getAllDependencies(packageJson) {
        const dependencies = new Map();

        if (this.options.scope === 'all' || this.options.scope === 'dependencies') {
            if (packageJson.dependencies) {
                Object.entries(packageJson.dependencies).forEach(([name, version]) => {
                    dependencies.set(name, {
                        version,
                        type: 'dependencies',
                        category: PackageUtils.categorizeDependency(name, packageJson)
                    });
                });
            }
        }

        if (this.options.includeDev && (this.options.scope === 'all' || this.options.scope === 'devDependencies')) {
            if (packageJson.devDependencies) {
                Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
                    if (!dependencies.has(name)) {
                        dependencies.set(name, {
                            version,
                            type: 'devDependencies',
                            category: PackageUtils.categorizeDependency(name, packageJson)
                        });
                    }
                });
            }
        }

        if (this.options.scope === 'all' || this.options.scope === 'peerDependencies') {
            if (packageJson.peerDependencies) {
                Object.entries(packageJson.peerDependencies).forEach(([name, version]) => {
                    if (!dependencies.has(name)) {
                        dependencies.set(name, {
                            version,
                            type: 'peerDependencies',
                            category: PackageUtils.categorizeDependency(name, packageJson)
                        });
                    }
                });
            }
        }

        return dependencies;
    }

    async analyzeImports() {
        // Get all source files
        const sourceFiles = await this.getSourceFiles();
        this.result.metadata.filesAnalyzed = sourceFiles.length;

        // Analyze imports in all files
        this.importMap = await this.importAnalyzer.analyzeFiles(sourceFiles);

        // Build dependency graph for circular detection
        this.dependencyGraph = await this.buildDependencyGraph(sourceFiles);

        // Detect circular dependencies
        await this.detectCircularDependencies();
    }

    async getSourceFiles() {
        const sourceFiles = [];
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.css', '.scss', '.sass'];

        const scanDir = async (dir) => {
            try {
                const items = await fs.readdir(dir, { withFileTypes: true });

                for (const item of items) {
                    const fullPath = path.join(dir, item.name);
                    const relativePath = path.relative(this.projectPath, fullPath);

                    // Skip common exclude patterns
                    if (this.shouldExclude(item.name, relativePath)) {
                        continue;
                    }

                    if (item.isDirectory()) {
                        await scanDir(fullPath);
                    } else if (extensions.some(ext => item.name.endsWith(ext))) {
                        sourceFiles.push(fullPath);
                    }
                }
            } catch (error) {
                // Skip directories that can't be read
            }
        };

        await scanDir(this.projectPath);
        return sourceFiles;
    }

    shouldExclude(name, relativePath) {
        const excludePatterns = [
            'node_modules',
            'dist',
            'build',
            'coverage',
            '.git',
            '.nyc_output',
            '.next',
            '.nuxt',
            'storybook-static'
        ];

        return name.startsWith('.') || excludePatterns.some(pattern => relativePath.includes(pattern));
    }

    async buildDependencyGraph(sourceFiles) {
        const graph = new Map();

        for (const filePath of sourceFiles) {
            const deps = [];
            const fileImports = await this.importAnalyzer.analyzeFile(filePath);

            for (const imp of fileImports) {
                if (this.importAnalyzer.isRelativeImport(imp.module)) {
                    const resolvedPath = this.importAnalyzer.resolveImportPath(imp.module, filePath);
                    if (resolvedPath && sourceFiles.includes(resolvedPath)) {
                        deps.push(resolvedPath);
                    }
                }
            }

            graph.set(filePath, deps);
        }

        return graph;
    }

    async detectCircularDependencies() {
        const visited = new Set();
        const recursionStack = new Set();
        const cycles = [];

        const dfs = (node, path) => {
            if (recursionStack.has(node)) {
                // Found a cycle
                const cycleStart = path.indexOf(node);
                const cycle = path.slice(cycleStart);
                cycles.push(cycle.map(f => path.relative(this.projectPath, f)));
                return;
            }

            if (visited.has(node)) return;

            visited.add(node);
            recursionStack.add(node);
            path.push(node);

            const deps = this.dependencyGraph.get(node) || [];
            for (const dep of deps) {
                dfs(dep, path);
            }

            recursionStack.delete(node);
            path.pop();
        };

        for (const node of this.dependencyGraph.keys()) {
            if (!visited.has(node)) {
                dfs(node, []);
            }
        }

        this.result.data.circular = cycles.map(cycle => ({
            path: cycle,
            severity: cycle.length <= 3 ? 'high' : cycle.length <= 5 ? 'medium' : 'low'
        }));
        this.result.data.summary.circular = cycles.length;
    }

    async findUnusedDependencies(dependencies) {
        for (const [depName, depInfo] of dependencies) {
            if (await this.isDependencyUsed(depName, depInfo)) {
                continue;
            }

            // Additional check for common patterns
            if (this.isUsedInConfigFiles(depName) || this.isUsedInScripts(depName)) {
                continue;
            }

            this.result.data.unused.push({
                name: depName,
                version: depInfo.version,
                type: depInfo.type,
                category: depInfo.category,
                confidence: this.calculateConfidence(depName),
                reason: this.getUnusedReason(depName, depInfo)
            });
            this.result.data.summary.unused++;
        }
    }

    async isDependencyUsed(depName, depInfo) {
        // Check if directly imported
        if (this.importMap.has(depName)) {
            return true;
        }

        // Check for indirect usage patterns
        const patterns = [
            // Babel presets
            depName.startsWith('@babel/') && this.importMap.has('babel'),
            // ESLint plugins
            depName.startsWith('eslint-plugin-') && this.importMap.has('eslint'),
            // TypeScript
            depName.startsWith('@types/') && this.importMap.has('typescript'),
            // Webpack loaders
            depName.endsWith('-loader') && this.importMap.has('webpack'),
            // Vite plugins
            depName.startsWith('vite-plugin-') && this.importMap.has('vite'),
            // Prettier plugins
            depName.startsWith('prettier-plugin-') && this.importMap.has('prettier')
        ];

        return patterns.some(Boolean);
    }

    isUsedInConfigFiles(depName) {
        // Check if used in configuration files
        const configFiles = [
            'webpack.config.js',
            'vite.config.js',
            'rollup.config.js',
            '.babelrc',
            'babel.config.js',
            'tsconfig.json',
            '.eslintrc.js',
            'prettier.config.js'
        ];

        // This is simplified - in practice, you'd read these files
        return false;
    }

    isUsedInScripts(depName) {
        // Check if used in package.json scripts
        // This is simplified
        return false;
    }

    calculateConfidence(depName) {
        // Higher confidence for clearly unused packages
        if (depName.startsWith('@types/')) return 'high';
        if (depName.includes('test') || depName.includes('spec')) return 'high';
        if (depName.startsWith('eslint-') || depName.startsWith('prettier-')) return 'high';
        return 'medium';
    }

    getUnusedReason(depName, depInfo) {
        if (depInfo.type === 'devDependencies') {
            if (depName.startsWith('@types/')) {
                return 'TypeScript type definitions not used';
            }
            if (depName.includes('test')) {
                return 'Testing dependency not used in test files';
            }
        }
        return 'Not imported in any source file';
    }

    async findMissingDependencies(dependencies) {
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        for (const [importName, usages] of this.importMap) {
            // Skip relative imports, built-ins, and TypeScript types
            if (this.importAnalyzer.isRelativeImport(importName) ||
                this.importAnalyzer.isBuiltinModule(importName) ||
                importName.startsWith('@types/')) {
                continue;
            }

            // Skip if it's a declared dependency
            if (dependencies.has(importName)) {
                continue;
            }

            // Check if it's a phantom dependency
            const existsInNodeModules = await PackageUtils.fileExists(
                path.join(nodeModulesPath, importName)
            );

            if (existsInNodeModules) {
                continue; // Will be handled by phantom dependency detection
            }

            this.result.data.missing.push({
                name: importName,
                usedIn: usages.map(u => ({
                    file: path.relative(this.projectPath, u.file),
                    line: u.line,
                    type: u.type
                })),
                suggestedType: PackageUtils.categorizeDependency(importName),
                confidence: usages.length > 2 ? 'high' : 'medium'
            });
            this.result.data.summary.missing++;
        }
    }

    async findPhantomDependencies(dependencies) {
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        for (const [importName, usages] of this.importMap) {
            if (this.importAnalyzer.isRelativeImport(importName) ||
                this.importAnalyzer.isBuiltinModule(importName) ||
                dependencies.has(importName)) {
                continue;
            }

            // Check if it exists in node_modules but not declared
            const modulePath = path.join(nodeModulesPath, importName);
            const packageJsonPath = path.join(modulePath, 'package.json');

            if (await PackageUtils.fileExists(packageJsonPath)) {
                const packageInfo = await PackageUtils.getPackageInfo(modulePath);
                if (packageInfo) {
                    this.result.data.phantom.push({
                        name: importName,
                        version: packageInfo.version,
                        usedIn: usages.map(u => path.relative(this.projectPath, u.file)),
                        risk: this.assessPhantomRisk(importName, usages.length),
                        suggestion: `Add to ${PackageUtils.categorizeDependency(importName)}`
                    });
                    this.result.data.summary.phantom++;
                }
            }
        }
    }

    assessPhantomRisk(dependencyName, usageCount) {
        // Higher risk for frequently used phantom dependencies
        if (usageCount > 10) return 'high';
        if (usageCount > 5) return 'medium';
        return 'low';
    }

    async analyzePeerDependencies() {
        const peerAnalysis = await this.peerAnalyzer.analyze();

        // Add peer conflicts to result
        this.result.data.peerConflicts = peerAnalysis.conflicts.map(conflict => ({
            type: conflict.type,
            package: conflict.package,
            message: conflict.message,
            severity: conflict.severity,
            requirements: conflict.requirements
        }));
        this.result.data.summary.peerConflicts = peerAnalysis.conflicts.length;

        // Add missing peer dependencies to missing list
        for (const missing of peerAnalysis.missing) {
            this.result.data.missing.push({
                name: missing.peerDependency,
                type: 'peer-dependency',
                requiredBy: missing.package,
                version: missing.requiredVersion,
                severity: missing.severity,
                suggestion: `Install ${missing.peerDependency}@${missing.requiredVersion}`
            });
        }

        // Store peer dependency analysis details
        this.result.data.peerDependencies = peerAnalysis;
    }

    async checkOutdatedDependencies(dependencies) {
        const batchSize = 5; // Check in batches to avoid overwhelming npm
        const depArray = Array.from(dependencies.entries());

        for (let i = 0; i < depArray.length; i += batchSize) {
            const batch = depArray.slice(i, i + batchSize);
            const batchPromises = batch.map(async ([name, info]) => {
                const latest = await PackageUtils.getLatestVersion(name);
                if (latest && PackageUtils.isOutdated(info.version, latest)) {
                    return {
                        name,
                        current: info.version,
                        latest,
                        type: info.type,
                        category: info.category
                    };
                }
                return null;
            });

            const results = await Promise.all(batchPromises);
            this.result.data.outdated.push(...results.filter(Boolean));
        }

        this.result.data.summary.outdated = this.result.data.outdated.length;
    }

    async checkSecurityVulnerabilities(dependencies) {
        // Simplified security check
        // In practice, you'd use npm audit or a vulnerability database
        const knownVulnerable = {
            'lodash': '<4.17.21',
            'axios': '<0.21.1',
            'request': '<2.88.2',
            'node-forge': '<1.3.0',
            'ssri': '<8.0.0'
        };

        for (const [name, info] of dependencies) {
            const vulnerableVersion = knownVulnerable[name];
            if (vulnerableVersion && this.versionInRange(info.version, vulnerableVersion)) {
                this.result.data.vulnerable.push({
                    name,
                    version: info.version,
                    severity: 'medium',
                    recommendation: `Upgrade to latest version`,
                    advisory: 'Known security vulnerability'
                });
            }
        }

        this.result.data.summary.vulnerable = this.result.data.vulnerable.length;
    }

    versionInRange(version, range) {
        // Simplified version range check
        // In practice, you'd use semver
        try {
            const cleanVersion = PackageUtils.cleanVersion(version);
            return range.startsWith('<') && this.compareVersions(cleanVersion, range.substring(1)) < 0;
        } catch {
            return false;
        }
    }

    compareVersions(v1, v2) {
        // Simple version comparison
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);

        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const p1 = parts1[i] || 0;
            const p2 = parts2[i] || 0;
            if (p1 !== p2) return p1 - p2;
        }
        return 0;
    }

    calculateHealthScore() {
        let score = 100;

        // Deduct points for issues
        score -= Math.min(30, this.result.data.summary.unused * 2); // Unused deps
        score -= Math.min(25, this.result.data.summary.missing * 3); // Missing deps
        score -= Math.min(20, this.result.data.summary.peerConflicts * 5); // Peer conflicts
        score -= Math.min(15, this.result.data.summary.vulnerable * 10); // Vulnerabilities
        score -= Math.min(10, this.result.data.summary.circular * 5); // Circular deps

        this.result.data.health.score = Math.max(0, score);

        // Generate health issues
        if (this.result.data.summary.unused > 0) {
            this.result.data.health.issues.push(`Remove ${this.result.data.summary.unused} unused dependencies`);
        }
        if (this.result.data.summary.missing > 0) {
            this.result.data.health.issues.push(`Install ${this.result.data.summary.missing} missing dependencies`);
        }
        if (this.result.data.summary.peerConflicts > 0) {
            this.result.data.health.issues.push(`Resolve ${this.result.data.summary.peerConflicts} peer dependency conflicts`);
        }
        if (this.result.data.summary.vulnerable > 0) {
            this.result.data.health.issues.push(`Update ${this.result.data.summary.vulnerable} vulnerable packages`);
        }
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Usage: node analyze-dependencies-v2.js <project_path> [options]');
        process.exit(1);
    }

    const projectPath = args[0];
    let options = {};

    // Parse command line options
    for (let i = 1; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const flag = args[i].substring(2);
            if (flag.includes('=')) {
                const [key, value] = flag.split('=');
                options[key] = value === 'true' ? true : value === 'false' ? false : value;
            } else {
                options[flag] = true;
            }
        } else if (args[i].startsWith('{')) {
            // JSON options
            try {
                options = { ...options, ...JSON.parse(args[i]) };
            } catch (error) {
                console.error('Options must be valid JSON');
                process.exit(1);
            }
        }
    }

    const analyzer = new AdvancedDependencyAnalyzer(projectPath, options);

    analyzer.analyze()
        .then(result => {
            if (options.pretty || false) {
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log(JSON.stringify(result));
            }
        })
        .catch(error => {
            console.error('Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = AdvancedDependencyAnalyzer;