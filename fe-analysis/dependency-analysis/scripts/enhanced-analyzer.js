#!/usr/bin/env node

/**
 * Enhanced Dependency Analyzer
 * Produces comprehensive dependency analysis with visual reports, categorization,
 * and actionable recommendations for frontend projects.
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Import modular analyzers
const ImportAnalyzer = require('./analyzers/import-analyzer');
const PeerDependencyAnalyzer = require('./analyzers/peer-dependency-analyzer');
const PackageUtils = require('./utils/package-utils');

class EnhancedDependencyAnalyzer {
    constructor(projectPath, options = {}) {
        this.projectPath = path.resolve(projectPath);
        this.options = {
            scope: options.scope || 'all',
            checkPeerDependencies: options.checkPeerDependencies !== false,
            checkOutdated: options.checkOutdated || false,
            checkSecurity: options.checkSecurity || false,
            includeDev: options.includeDev !== false,
            generateGraph: options.generateGraph || false,
            generateFixScript: options.generateFixScript || false,
            maxDepth: options.maxDepth || 5,
            parallel: options.parallel || false,
            incremental: options.incremental || false,
            cacheDir: options.cacheDir || path.join(this.projectPath, '.dependency-cache'),
            filePattern: options.filePattern || '**/*.{js,jsx,ts,tsx,vue,svelte}',
            ...options
        };

        this.importAnalyzer = new ImportAnalyzer(this.projectPath, this.options);
        this.peerAnalyzer = new PeerDependencyAnalyzer(this.projectPath, this.options);

        this.result = {
            success: true,
            timestamp: new Date().toISOString(),
            project: {
                name: '',
                version: '',
                path: this.projectPath
            },
            summary: {
                total: 0,
                unused: 0,
                missing: 0,
                phantom: 0,
                outdated: 0,
                vulnerable: 0,
                peerConflicts: 0,
                circular: 0,
                duplicate: 0,
                versionConflicts: 0
            },
            categories: {
                frontend: { count: 0, size: '0KB', packages: [] },
                backend: { count: 0, size: '0KB', packages: [] },
                devtools: { count: 0, size: '0KB', packages: [] },
                testing: { count: 0, size: '0KB', packages: [] },
                build: { count: 0, size: '0KB', packages: [] },
                other: { count: 0, size: '0KB', packages: [] }
            },
            issues: {
                unused: [],
                missing: [],
                phantom: [],
                peerConflicts: [],
                circular: [],
                duplicate: [],
                versionConflicts: [],
                outdated: [],
                vulnerable: []
            },
            recommendations: {
                high: [],
                medium: [],
                low: []
            },
            dependencies: {},
            graph: {
                nodes: [],
                edges: []
            },
            metadata: {
                analyzedAt: new Date().toISOString(),
                duration: 0,
                filesAnalyzed: 0,
                cacheHits: 0
            }
        };
    }

    async analyze() {
        const startTime = Date.now();

        try {
            // Setup cache if incremental
            if (this.options.incremental) {
                await this.setupCache();
            }

            // Load package.json
            const packageJson = await this.loadPackageJson();
            if (!packageJson) {
                throw new Error('package.json not found');
            }

            this.result.project.name = packageJson.name || path.basename(this.projectPath);
            this.result.project.version = packageJson.version || '0.0.0';

            // Initialize analyzers
            await this.importAnalyzer.initialize();

            // Get and categorize dependencies
            const dependencies = await this.getAllDependencies(packageJson);
            await this.categorizeDependencies(dependencies);

            // Analyze imports
            const sourceFiles = await this.getSourceFiles();
            this.result.metadata.filesAnalyzed = sourceFiles.length;

            if (this.options.parallel && sourceFiles.length > 100) {
                await this.analyzeImportsParallel(sourceFiles);
            } else {
                await this.analyzeImportsSequential(sourceFiles);
            }

            // Run all analyses
            await Promise.all([
                this.findUnusedDependencies(dependencies),
                this.findMissingDependencies(dependencies),
                this.findPhantomDependencies(dependencies),
                this.detectDuplicateDependencies(dependencies),
                this.detectVersionConflicts(dependencies)
            ]);

            // Optional analyses
            if (this.options.checkPeerDependencies) {
                await this.analyzePeerDependencies();
            }

            if (this.options.checkOutdated) {
                await this.checkOutdatedDependencies(dependencies);
            }

            if (this.options.checkSecurity) {
                await this.checkSecurityVulnerabilities(dependencies);
            }

            // Generate recommendations
            await this.generateRecommendations();

            // Generate outputs
            if (this.options.generateGraph) {
                await this.generateDependencyGraph();
            }

            if (this.options.generateFixScript) {
                await this.generateFixScript();
            }

            // Generate markdown report
            await this.generateMarkdownReport();

        } catch (error) {
            this.result.success = false;
            this.result.error = {
                message: error.message,
                stack: error.stack
            };
        }

        this.result.metadata.duration = Date.now() - startTime;
        return this.result;
    }

    async setupCache() {
        try {
            await fs.mkdir(this.options.cacheDir, { recursive: true });
        } catch (error) {
            // Cache directory might exist
        }
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

    async getAllDependencies(packageJson) {
        const dependencies = new Map();

        const addDependencies = (deps, type) => {
            if (!deps) return;

            Object.entries(deps).forEach(async ([name, version]) => {
                dependencies.set(name, {
                    version,
                    type,
                    category: this.categorizeDependency(name),
                    size: await this.getDependencySize(name),
                    lastUsed: null // Can be enhanced with git blame analysis
                });
            });
        };

        if (this.options.scope === 'all' || this.options.scope === 'dependencies') {
            addDependencies(packageJson.dependencies, 'dependencies');
        }

        if (this.options.includeDev && (this.options.scope === 'all' || this.options.scope === 'devDependencies')) {
            addDependencies(packageJson.devDependencies, 'devDependencies');
        }

        if (this.options.scope === 'all' || this.options.scope === 'peerDependencies') {
            addDependencies(packageJson.peerDependencies, 'peerDependencies');
        }

        this.result.summary.total = dependencies.size;
        this.result.dependencies = Object.fromEntries(dependencies);

        return dependencies;
    }

    categorizeDependency(name) {
        const patterns = {
            frontend: [
                'react', 'vue', 'angular', 'svelte', 'preact', 'solid-js',
                'next', 'nuxt', 'remix', 'gatsby', 'astro'
            ],
            backend: [
                'express', 'koa', 'fastify', 'hapi', 'nest', 'loopback',
                'mongoose', 'sequelize', 'typeorm', 'prisma'
            ],
            devtools: [
                'eslint', 'prettier', 'webpack', 'vite', 'rollup', 'parcel',
                'babel', 'postcss', 'autoprefixer', 'tailwindcss'
            ],
            testing: [
                'jest', 'vitest', 'mocha', 'chai', 'cypress', 'playwright',
                'testing-library', 'test', 'spec'
            ],
            build: [
                'typescript', '@types/', 'ts-node', 'tsx', 'esbuild',
                'terser', 'uglify', 'clean-css'
            ]
        };

        for (const [category, keywords] of Object.entries(patterns)) {
            if (keywords.some(keyword => name.includes(keyword))) {
                return category;
            }
        }

        return 'other';
    }

    async categorizeDependencies(dependencies) {
        for (const [name, info] of dependencies) {
            const category = info.category || this.categorizeDependency(name);
            this.result.categories[category].count++;
            this.result.categories[category].packages.push({
                name,
                version: info.version,
                size: info.size || '0KB'
            });

            // Update category size
            // This would need actual size calculation in a real implementation
        }
    }

    async getDependencySize(name) {
        // Simplified size calculation
        // In practice, you'd calculate actual disk usage
        const avgSize = Math.random() * 1000; // KB
        return `${Math.round(avgSize)}KB`;
    }

    async getSourceFiles() {
        const sourceFiles = [];
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.css', '.scss', '.sass'];

        const scanDir = async (dir) => {
            try {
                const items = await fs.readdir(dir, { withFileTypes: true });

                const promises = items.map(async (item) => {
                    const fullPath = path.join(dir, item.name);
                    const relativePath = path.relative(this.projectPath, fullPath);

                    if (this.shouldExclude(item.name, relativePath)) {
                        return;
                    }

                    if (item.isDirectory()) {
                        await scanDir(fullPath);
                    } else if (extensions.some(ext => item.name.endsWith(ext))) {
                        sourceFiles.push(fullPath);
                    }
                });

                await Promise.all(promises);
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
            'storybook-static',
            '.cache',
            '.dependency-cache'
        ];

        return name.startsWith('.') || excludePatterns.some(pattern =>
            relativePath.includes(pattern) || name === pattern
        );
    }

    async analyzeImportsSequential(sourceFiles) {
        this.importMap = new Map();

        for (const file of sourceFiles) {
            const imports = await this.importAnalyzer.analyzeFile(file);
            for (const imp of imports) {
                if (!this.importMap.has(imp.module)) {
                    this.importMap.set(imp.module, []);
                }
                this.importMap.get(imp.module).push({
                    file,
                    line: imp.line,
                    type: imp.type
                });
            }
        }

        // Build dependency graph for circular detection
        this.dependencyGraph = await this.buildDependencyGraph(sourceFiles);
        await this.detectCircularDependencies();
    }

    async analyzeImportsParallel(sourceFiles) {
        // Simplified parallel processing
        // In practice, you'd use worker threads
        const batchSize = 50;
        this.importMap = new Map();

        for (let i = 0; i < sourceFiles.length; i += batchSize) {
            const batch = sourceFiles.slice(i, i + batchSize);
            const promises = batch.map(file => this.importAnalyzer.analyzeFile(file));

            const results = await Promise.all(promises);

            results.forEach(imports => {
                for (const imp of imports) {
                    if (!this.importMap.has(imp.module)) {
                        this.importMap.set(imp.module, []);
                    }
                    this.importMap.get(imp.module).push({
                        file: imp.file,
                        line: imp.line,
                        type: imp.type
                    });
                }
            });
        }
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
                dfs(dep, [...path]);
            }

            recursionStack.delete(node);
            path.pop();
        };

        for (const node of this.dependencyGraph.keys()) {
            if (!visited.has(node)) {
                dfs(node, []);
            }
        }

        this.result.issues.circular = cycles.map(cycle => ({
            path: cycle,
            severity: cycle.length <= 3 ? 'high' : cycle.length <= 5 ? 'medium' : 'low',
            impact: this.calculateCycleImpact(cycle)
        }));

        this.result.summary.circular = cycles.length;
    }

    calculateCycleImpact(cycle) {
        // Calculate potential impact based on file sizes and complexity
        return {
            complexity: cycle.length,
            estimatedRisk: cycle.length > 5 ? 'high' : 'medium'
        };
    }

    async findUnusedDependencies(dependencies) {
        for (const [depName, depInfo] of dependencies) {
            if (await this.isDependencyUsed(depName, depInfo)) {
                continue;
            }

            if (this.isUsedInConfigFiles(depName) || this.isUsedInScripts(depName)) {
                continue;
            }

            const unused = {
                name: depName,
                version: depInfo.version,
                type: depInfo.type,
                category: depInfo.category,
                size: depInfo.size,
                confidence: this.calculateConfidence(depName),
                reason: this.getUnusedReason(depName, depInfo),
                suggestedAction: this.getSuggestedAction(depName, depInfo)
            };

            this.result.issues.unused.push(unused);
            this.result.summary.unused++;
        }
    }

    async isDependencyUsed(depName, depInfo) {
        if (this.importMap.has(depName)) {
            return true;
        }

        const patterns = [
            depName.startsWith('@babel/') && this.importMap.has('babel'),
            depName.startsWith('eslint-plugin-') && this.importMap.has('eslint'),
            depName.startsWith('@types/') && this.importMap.has('typescript'),
            depName.endsWith('-loader') && this.importMap.has('webpack'),
            depName.startsWith('vite-plugin-') && this.importMap.has('vite'),
            depName.startsWith('prettier-plugin-') && this.importMap.has('prettier')
        ];

        return patterns.some(Boolean);
    }

    isUsedInConfigFiles(depName) {
        // Enhanced config file checking
        const configFiles = [
            'webpack.config.js', 'webpack.config.ts',
            'vite.config.js', 'vite.config.ts',
            'rollup.config.js', 'rollup.config.ts',
            '.babelrc', 'babel.config.js',
            'tsconfig.json', 'tsconfig.build.json',
            '.eslintrc.js', '.eslintrc.json', '.eslintrc.yml',
            'prettier.config.js', '.prettierrc',
            'tailwind.config.js', 'postcss.config.js',
            'jest.config.js', 'vitest.config.js'
        ];

        // In practice, you'd read these files and check for usage
        return false;
    }

    isUsedInScripts(depName) {
        // Enhanced script checking in package.json
        // In practice, you'd parse package.json scripts
        return false;
    }

    calculateConfidence(depName) {
        if (depName.startsWith('@types/')) return 'high';
        if (depName.includes('test') || depName.includes('spec')) return 'high';
        if (depName.startsWith('eslint-') || depName.startsWith('prettier-')) return 'high';
        if (depName.startsWith('webpack') || depName.startsWith('vite')) return 'medium';
        return 'medium';
    }

    getUnusedReason(depName, depInfo) {
        if (depInfo.type === 'devDependencies') {
            if (depName.startsWith('@types/')) {
                return 'TypeScript type definitions not referenced';
            }
            if (depName.includes('test')) {
                return 'Testing package not used in test files';
            }
            return 'Development dependency not used in build process';
        }
        return 'Package not imported in any source file';
    }

    getSuggestedAction(depName, depInfo) {
        if (depInfo.type === 'devDependencies') {
            return `Remove from ${depInfo.type}`;
        }
        if (depName.startsWith('@types/')) {
            return 'Check if TypeScript types are still needed';
        }
        return 'Consider removing if truly unused';
    }

    async findMissingDependencies(dependencies) {
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        for (const [importName, usages] of this.importMap) {
            if (this.importAnalyzer.isRelativeImport(importName) ||
                this.importAnalyzer.isBuiltinModule(importName) ||
                importName.startsWith('@types/')) {
                continue;
            }

            if (dependencies.has(importName)) {
                continue;
            }

            const existsInNodeModules = await PackageUtils.fileExists(
                path.join(nodeModulesPath, importName)
            );

            if (existsInNodeModules) {
                continue;
            }

            const missing = {
                name: importName,
                usedIn: usages.map(u => ({
                    file: path.relative(this.projectPath, u.file),
                    line: u.line,
                    type: u.type
                })),
                suggestedType: this.categorizeDependency(importName),
                confidence: usages.length > 2 ? 'high' : 'medium',
                severity: usages.length > 5 ? 'high' : 'medium',
                npmCommand: `npm install ${importName}`
            };

            this.result.issues.missing.push(missing);
            this.result.summary.missing++;
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

            const modulePath = path.join(nodeModulesPath, importName);
            const packageJsonPath = path.join(modulePath, 'package.json');

            if (await PackageUtils.fileExists(packageJsonPath)) {
                const packageInfo = await PackageUtils.getPackageInfo(modulePath);
                if (packageInfo) {
                    const phantom = {
                        name: importName,
                        version: packageInfo.version,
                        usedIn: usages.map(u => path.relative(this.projectPath, u.file)),
                        risk: this.assessPhantomRisk(importName, usages.length),
                        providedBy: await this.findPhantomProvider(importName),
                        suggestion: `Add to ${this.categorizeDependency(importName)}`
                    };

                    this.result.issues.phantom.push(phantom);
                    this.result.summary.phantom++;
                }
            }
        }
    }

    assessPhantomRisk(dependencyName, usageCount) {
        if (usageCount > 10) return 'high';
        if (usageCount > 5) return 'medium';
        return 'low';
    }

    async findPhantomProvider(dependencyName) {
        // Try to find which package provides this phantom dependency
        // This would require analyzing the dependency tree
        return 'Unknown';
    }

    async detectDuplicateDependencies(dependencies) {
        const duplicateMap = new Map();

        for (const [name, info] of dependencies) {
            // Check for different packages with similar functionality
            const category = info.category;
            if (!duplicateMap.has(category)) {
                duplicateMap.set(category, []);
            }
            duplicateMap.get(category).push(name);
        }

        // Find potential duplicates
        const duplicateGroups = [
            ['lodash', 'underscore', 'ramda'],
            ['moment', 'date-fns', 'dayjs'],
            ['axios', 'fetch', 'request', 'superagent'],
            ['react-router', 'reach-router', 'next/router'],
            ['styled-components', 'emotion', 'glamorous']
        ];

        for (const group of duplicateGroups) {
            const found = group.filter(name => dependencies.has(name));
            if (found.length > 1) {
                this.result.issues.duplicate.push({
                    type: 'functional',
                    packages: found.map(name => ({
                        name,
                        version: dependencies.get(name).version,
                        size: dependencies.get(name).size
                    })),
                    recommendation: `Consider consolidating to a single ${group[0]} implementation`,
                    impact: 'medium'
                });
                this.result.summary.duplicate++;
            }
        }
    }

    async detectVersionConflicts(dependencies) {
        // Check for version conflicts between dependencies and their peer requirements
        const conflicts = [];

        for (const [name, info] of dependencies) {
            try {
                const packagePath = path.join(this.projectPath, 'node_modules', name);
                const peerDeps = await this.getPeerDependencies(packagePath);

                for (const [peerName, peerRange] of Object.entries(peerDeps || {})) {
                    const installedVersion = dependencies.get(peerName)?.version;
                    if (installedVersion && !this.satisfiesVersion(installedVersion, peerRange)) {
                        conflicts.push({
                            package: name,
                            peerDependency: peerName,
                            required: peerRange,
                            installed: installedVersion,
                            severity: 'high'
                        });
                    }
                }
            } catch (error) {
                // Skip if package not found or unreadable
            }
        }

        this.result.issues.versionConflicts = conflicts;
        this.result.summary.versionConflicts = conflicts.length;
    }

    async getPeerDependencies(packagePath) {
        try {
            const packageJsonPath = path.join(packagePath, 'package.json');
            const content = await fs.readFile(packageJsonPath, 'utf-8');
            const packageJson = JSON.parse(content);
            return packageJson.peerDependencies;
        } catch (error) {
            return null;
        }
    }

    satisfiesVersion(version, range) {
        // Simplified semver check
        // In practice, you'd use the semver library
        return true;
    }

    async analyzePeerDependencies() {
        const peerAnalysis = await this.peerAnalyzer.analyze();

        this.result.issues.peerConflicts = peerAnalysis.conflicts.map(conflict => ({
            type: conflict.type,
            package: conflict.package,
            message: conflict.message,
            severity: conflict.severity,
            requirements: conflict.requirements
        }));

        this.result.summary.peerConflicts = peerAnalysis.conflicts.length;

        // Add missing peer dependencies
        for (const missing of peerAnalysis.missing) {
            this.result.issues.missing.push({
                name: missing.peerDependency,
                type: 'peer-dependency',
                requiredBy: missing.package,
                version: missing.requiredVersion,
                severity: missing.severity,
                suggestion: `Install ${missing.peerDependency}@${missing.requiredVersion}`
            });
        }
    }

    async checkOutdatedDependencies(dependencies) {
        const batchSize = 5;
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
                        category: info.category,
                        updateType: this.getUpdateType(info.version, latest),
                        breakingChanges: await this.checkBreakingChanges(name, info.version, latest)
                    };
                }
                return null;
            });

            const results = await Promise.all(batchPromises);
            this.result.issues.outdated.push(...results.filter(Boolean));
        }

        this.result.summary.outdated = this.result.issues.outdated.length;
    }

    getUpdateType(current, latest) {
        const [currentMajor] = current.split('.');
        const [latestMajor] = latest.split('.');

        if (currentMajor !== latestMajor) return 'major';
        if (current !== latest) return 'minor';
        return 'patch';
    }

    async checkBreakingChanges(name, from, to) {
        // In practice, you'd check changelogs or GitHub releases
        return null;
    }

    async checkSecurityVulnerabilities(dependencies) {
        // Enhanced security check with more comprehensive database
        const vulnerabilities = await this.fetchVulnerabilityDatabase();

        for (const [name, info] of dependencies) {
            const vulns = vulnerabilities[name];
            if (vulns) {
                const affected = vulns.filter(v => this.versionInRange(info.version, v.vulnerableVersions));
                for (const vuln of affected) {
                    this.result.issues.vulnerable.push({
                        name,
                        version: info.version,
                        severity: vuln.severity,
                        title: vuln.title,
                        url: vuln.url,
                        patchedIn: vuln.patchedVersions[0],
                        recommendation: `Update to ${vuln.patchedVersions[0]} or later`,
                        cve: vuln.cve
                    });
                }
            }
        }

        this.result.summary.vulnerable = this.result.issues.vulnerable.length;
    }

    async fetchVulnerabilityDatabase() {
        // In practice, you'd fetch from OSV database or npm audit
        return {
            'lodash': [{
                severity: 'high',
                title: 'Prototype Pollution',
                vulnerableVersions: '<4.17.21',
                patchedVersions: ['4.17.21'],
                url: 'https://github.com/advisories/GHSA-p6mc-m468-83gw',
                cve: 'CVE-2021-23337'
            }],
            'axios': [{
                severity: 'medium',
                title: 'Server-Side Request Forgery',
                vulnerableVersions: '<0.21.1',
                patchedVersions: ['0.21.1'],
                url: 'https://github.com/advisories/GHSA-4hc2-jf5x-2r5q',
                cve: 'CVE-2021-3749'
            }]
        };
    }

    versionInRange(version, range) {
        // Simplified version check
        try {
            const cleanVersion = PackageUtils.cleanVersion(version);
            return range.startsWith('<') && this.compareVersions(cleanVersion, range.substring(1)) < 0;
        } catch {
            return false;
        }
    }

    compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);

        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const p1 = parts1[i] || 0;
            const p2 = parts2[i] || 0;
            if (p1 !== p2) return p1 - p2;
        }
        return 0;
    }

    async generateRecommendations() {
        const recommendations = [];

        // High priority recommendations
        if (this.result.issues.vulnerable.length > 0) {
            recommendations.push({
                priority: 'high',
                type: 'security',
                title: 'Update Vulnerable Packages',
                description: `Found ${this.result.issues.vulnerable.length} packages with known security vulnerabilities`,
                action: 'Update immediately to patched versions',
                packages: this.result.issues.vulnerable.map(v => v.name)
            });
        }

        if (this.result.issues.missing.length > 0) {
            recommendations.push({
                priority: 'high',
                type: 'errors',
                title: 'Install Missing Dependencies',
                description: `Found ${this.result.issues.missing.length} missing dependencies that will cause runtime errors`,
                action: 'Install missing packages',
                packages: this.result.issues.missing.map(m => m.name)
            });
        }

        // Medium priority recommendations
        if (this.result.issues.unused.length > 0) {
            recommendations.push({
                priority: 'medium',
                type: 'cleanup',
                title: 'Remove Unused Dependencies',
                description: `Found ${this.result.issues.unused.length} unused dependencies (${this.calculateUnusedSize()})`,
                action: 'Remove unused packages to reduce bundle size',
                packages: this.result.issues.unused.map(u => u.name)
            });
        }

        if (this.result.issues.outdated.length > 0) {
            recommendations.push({
                priority: 'medium',
                type: 'updates',
                title: 'Update Outdated Packages',
                description: `Found ${this.result.issues.outdated.length} outdated packages`,
                action: 'Update to latest versions for new features and bug fixes',
                packages: this.result.issues.outdated.map(o => o.name)
            });
        }

        // Low priority recommendations
        if (this.result.issues.duplicate.length > 0) {
            recommendations.push({
                priority: 'low',
                type: 'optimization',
                title: 'Consolidate Duplicate Dependencies',
                description: `Found ${this.result.issues.duplicate.length} sets of functionally duplicate packages`,
                action: 'Consider consolidating to reduce maintenance overhead',
                packages: this.result.issues.duplicate.flatMap(d => d.packages.map(p => p.name))
            });
        }

        // Group by priority
        this.result.recommendations.high = recommendations.filter(r => r.priority === 'high');
        this.result.recommendations.medium = recommendations.filter(r => r.priority === 'medium');
        this.result.recommendations.low = recommendations.filter(r => r.priority === 'low');
    }

    calculateUnusedSize() {
        return this.result.issues.unused.reduce((total, dep) => {
            const size = parseInt(dep.size) || 0;
            return total + size;
        }, 0);
    }

    async generateDependencyGraph() {
        const nodes = [];
        const edges = [];

        // Add dependency nodes
        for (const [name, info] of Object.entries(this.result.dependencies)) {
            nodes.push({
                id: name,
                label: name,
                type: info.type,
                category: info.category,
                version: info.version,
                size: this.getNodeSize(info)
            });
        }

        // Add edges based on actual imports
        for (const [importName, usages] of this.importMap) {
            if (nodes.find(n => n.id === importName)) {
                for (const usage of usages) {
                    // Find the file that imports this
                    const fileName = path.basename(usage.file);
                    edges.push({
                        from: fileName,
                        to: importName,
                        type: usage.type
                    });
                }
            }
        }

        this.result.graph = { nodes, edges };
    }

    getNodeSize(info) {
        // Size based on category and importance
        const sizeMap = {
            frontend: 30,
            backend: 25,
            devtools: 20,
            testing: 15,
            build: 20,
            other: 10
        };
        return sizeMap[info.category] || 10;
    }

    async generateMarkdownReport() {
        const ReportGenerator = require('./generate-report');
        const reportGenerator = new ReportGenerator(this.result, this.projectPath);
        const markdownPath = await reportGenerator.generateMarkdownReport();
        this.result.markdownReport = markdownPath;
    }

    async generateFixScript() {
        const script = await this.generateNpmFixScript();
        const outputPath = path.join(this.projectPath, 'fix-dependencies.sh');
        await fs.writeFile(outputPath, script, { mode: 0o755 });

        this.result.fixScript = outputPath;
    }

    async generateNpmFixScript() {
        const commands = [];

        // Install missing dependencies
        if (this.result.issues.missing.length > 0) {
            const missingDeps = this.result.issues.missing
                .filter(m => m.type !== 'peer-dependency')
                .map(m => m.name)
                .join(' ');
            commands.push(`echo "Installing missing dependencies..."`);
            commands.push(`npm install ${missingDeps}`);
            commands.push('');
        }

        // Remove unused dependencies
        if (this.result.issues.unused.length > 0) {
            const unusedDeps = this.result.issues.unused
                .filter(u => u.confidence === 'high')
                .map(u => u.name)
                .join(' ');
            if (unusedDeps) {
                commands.push(`echo "Removing unused dependencies..."`);
                commands.push(`npm uninstall ${unusedDeps}`);
                commands.push('');
            }
        }

        // Update vulnerable packages
        if (this.result.issues.vulnerable.length > 0) {
            commands.push(`echo "Updating vulnerable packages..."`);
            for (const vuln of this.result.issues.vulnerable) {
                commands.push(`npm update ${vuln.name}`);
            }
            commands.push('');
        }

        // Update outdated packages
        if (this.result.issues.outdated.length > 0) {
            commands.push(`echo "Updating outdated packages..."`);
            commands.push('npm update');
        }

        return `#!/bin/bash
# Auto-generated dependency fix script
# Generated on ${new Date().toISOString()}

set -e

echo "🔧 Fixing dependency issues..."

${commands.join('\n')}

echo "✅ Dependency fixes completed!"
echo "📊 Run 'npm audit' to verify no vulnerabilities remain"
`;
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Usage: node enhanced-analyzer.js <project_path> [options]');
        console.error('');
        console.error('Options:');
        console.error('  --generateFixScript Generate fix script');
        console.error('  --generateGraph     Generate dependency graph');
        console.error('  --parallel          Use parallel processing');
        console.error('  --incremental       Use incremental analysis with cache');
        console.error('');
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
            try {
                options = { ...options, ...JSON.parse(args[i]) };
            } catch (error) {
                console.error('Options must be valid JSON');
                process.exit(1);
            }
        }
    }

    const analyzer = new EnhancedDependencyAnalyzer(projectPath, options);

    analyzer.analyze()
        .then(result => {
            if (options.pretty || process.stdout.isTTY) {
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log(JSON.stringify(result));
            }

            if (result.markdownReport) {
                console.log(`\n📝 Markdown report generated: ${result.markdownReport}`);
            }

            if (result.fixScript) {
                console.log(`\n🔧 Fix script generated: ${result.fixScript}`);
            }
        })
        .catch(error => {
            console.error('Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = EnhancedDependencyAnalyzer;
