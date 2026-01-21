#!/usr/bin/env node

/**
 * Dependency Analyzer
 * Analyzes project dependencies and identifies unused, missing, phantom, and circular dependencies.
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const acorn = require('acorn');
const walk = require('acorn-walk');

class DependencyAnalyzer {
    constructor(projectPath, options = {}) {
        this.projectPath = path.resolve(projectPath);
        this.options = options;
        this.scope = options.scope || 'all';
        this.generateGraph = options.generateGraph || false;
        this.checkSecurity = options.checkSecurity || false;
        this.files = options.files || 'changed';

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
                    circular: 0
                },
                unused: [],
                missing: [],
                phantom: [],
                circular: [],
                outdated: [],
                vulnerable: []
            },
            warnings: [],
            metadata: {
                analyzedAt: new Date().toISOString(),
                duration: 0,
                scope: this.scope,
                filesAnalyzed: []
            }
        };

        this.importMap = new Map(); // Maps imported modules to files that use them
        this.dependencyGraph = new Map(); // Maps files to their dependencies
        this.circularPaths = [];
        this.phantomDeps = new Set();
    }

    async analyze() {
        const startTime = Date.now();

        try {
            // Load package.json
            const packageJson = await this.loadPackageJson();
            if (!packageJson) {
                this.result.success = false;
                this.result.error = 'package.json not found';
                return this.result;
            }

            // Get all dependencies based on scope
            const dependencies = this.getDependencies(packageJson);
            this.result.data.summary.total = dependencies.size;

            // Analyze source files to find imports
            await this.analyzeSourceFiles();

            // Find unused dependencies
            await this.findUnusedDependencies(dependencies);

            // Find missing dependencies
            await this.findMissingDependencies(dependencies);

            // Find phantom dependencies
            await this.findPhantomDependencies(dependencies, packageJson);

            // Detect circular dependencies
            await this.detectCircularDependencies();

            // Check for outdated dependencies (P1 feature)
            if (this.options.checkOutdated) {
                await this.checkOutdatedDependencies(dependencies);
            }

            // Security check (P1 feature)
            if (this.checkSecurity) {
                await this.checkSecurityVulnerabilities(dependencies);
            }

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
        } catch {
            return null;
        }
    }

    getDependencies(packageJson) {
        const deps = new Map();

        if (this.scope === 'all' || this.scope === 'dependencies') {
            if (packageJson.dependencies) {
                Object.entries(packageJson.dependencies).forEach(([name, version]) => {
                    deps.set(name, { version, type: 'dependencies' });
                });
            }
        }

        if (this.scope === 'all' || this.scope === 'devDependencies') {
            if (packageJson.devDependencies) {
                Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
                    deps.set(name, { version, type: 'devDependencies' });
                });
            }
        }

        if (this.scope === 'all' || this.scope === 'peerDependencies') {
            if (packageJson.peerDependencies) {
                Object.entries(packageJson.peerDependencies).forEach(([name, version]) => {
                    deps.set(name, { version, type: 'peerDependencies' });
                });
            }
        }

        return deps;
    }

    async analyzeSourceFiles() {
        const sourceFiles = await this.getSourceFiles();
        this.result.metadata.filesAnalyzed = sourceFiles.map(f => path.relative(this.projectPath, f));

        for (const filePath of sourceFiles) {
            await this.analyzeFile(filePath);
        }
    }

    async getSourceFiles() {
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];
        const sourceFiles = [];

        const scanDir = async (dir) => {
            const items = await fs.readdir(dir, { withFileTypes: true });

            for (const item of items) {
                const fullPath = path.join(dir, item.name);
                const relativePath = path.relative(this.projectPath, fullPath);

                // Skip common exclude patterns
                if (item.name.startsWith('.') ||
                    item.name === 'node_modules' ||
                    item.name === 'dist' ||
                    item.name === 'build' ||
                    relativePath.includes('coverage')) {
                    continue;
                }

                if (item.isDirectory()) {
                    await scanDir(fullPath);
                } else if (extensions.some(ext => item.name.endsWith(ext))) {
                    sourceFiles.push(fullPath);
                }
            }
        };

        try {
            await scanDir(this.projectPath);
        } catch (error) {
            // Directory might not exist
        }

        return sourceFiles;
    }

    async analyzeFile(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const imports = this.extractImports(content, filePath);

            this.dependencyGraph.set(filePath, imports);

            for (const imp of imports) {
                if (!this.importMap.has(imp.module)) {
                    this.importMap.set(imp.module, []);
                }
                this.importMap.get(imp.module).push({
                    file: filePath,
                    line: imp.line,
                    type: imp.type
                });
            }
        } catch (error) {
            // Skip files that can't be read or parsed
        }
    }

    extractImports(content, filePath) {
        const imports = [];

        try {
            // Try to parse with acorn for JavaScript/TypeScript files
            const isTS = filePath.endsWith('.ts') || filePath.endsWith('.tsx');
            const parserOptions = {
                sourceType: 'module',
                ecmaVersion: 'latest',
                allowHashBang: true,
                allowReturnOutsideFunction: true
            };

            if (isTS) {
                // For TypeScript files, we'll use regex as fallback
                return this.extractImportsWithRegex(content);
            }

            const ast = acorn.parse(content, parserOptions);

            walk.simple(ast, {
                ImportDeclaration(node) {
                    imports.push({
                        module: node.source.value,
                        type: 'import',
                        line: node.loc?.start?.line || 0
                    });
                },
                CallExpression(node) {
                    if (node.callee.type === 'Import' && node.arguments.length > 0) {
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            imports.push({
                                module: arg.value,
                                type: 'dynamic-import',
                                line: node.loc?.start?.line || 0
                            });
                        }
                    }
                    // Handle require() calls
                    if (node.callee.type === 'Identifier' && node.callee.name === 'require' &&
                        node.arguments.length > 0) {
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            imports.push({
                                module: arg.value,
                                type: 'require',
                                line: node.loc?.start?.line || 0
                            });
                        }
                    }
                }
            });
        } catch (error) {
            // Fallback to regex-based extraction
            return this.extractImportsWithRegex(content);
        }

        return imports;
    }

    extractImportsWithRegex(content) {
        const imports = [];
        const lines = content.split('\n');

        const importPatterns = [
            // ES6 imports
            /^import\s+.*?from\s+['"`]([^'"`]+)['"`]/,
            // Dynamic imports
            /import\s*\(\s*['"`]([^'"`]+)['"`]/,
            // CommonJS require
            /require\s*\(\s*['"`]([^'"`]+)['"`]/,
            // require.resolve
            /require\.resolve\s*\(\s*['"`]([^'"`]+)['"`]/
        ];

        lines.forEach((line, index) => {
            for (const pattern of importPatterns) {
                const match = line.match(pattern);
                if (match) {
                    imports.push({
                        module: match[1],
                        type: 'regex',
                        line: index + 1
                    });
                }
            }
        });

        return imports;
    }

    async findUnusedDependencies(dependencies) {
        for (const [depName, depInfo] of dependencies) {
            const isUsed = this.isDependencyUsed(depName);

            if (!isUsed) {
                this.result.data.unused.push({
                    name: depName,
                    confidence: 'high',
                    reason: '未在任何文件中导入',
                    type: depInfo.type,
                    version: depInfo.version
                });
                this.result.data.summary.unused++;
            }
        }
    }

    isDependencyUsed(depName) {
        // Check if dependency is directly imported
        if (this.importMap.has(depName)) {
            return true;
        }

        // Check for common patterns (e.g., @babel/core for babel presets)
        const patterns = [
            // Babel packages
            depName.startsWith('@babel/') && this.importMap.has('babel'),
            // Webpack loaders
            depName.endsWith('-loader') && this.importMap.has('webpack'),
            // TypeScript
            depName.startsWith('@types/') && this.importMap.has('typescript'),
            // ESLint plugins
            depName.startsWith('eslint-plugin-') && this.importMap.has('eslint'),
            // Prettier plugins
            depName.startsWith('prettier-plugin-') && this.importMap.has('prettier')
        ];

        return patterns.some(Boolean);
    }

    async findMissingDependencies(dependencies) {
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        for (const [importName, usages] of this.importMap) {
            // Skip relative imports and built-in modules
            if (importName.startsWith('./') ||
                importName.startsWith('../') ||
                importName.startsWith('/') ||
                this.isBuiltinModule(importName)) {
                continue;
            }

            // Check if it's a declared dependency
            if (dependencies.has(importName)) {
                continue;
            }

            // Check if it exists in node_modules
            const existsInNodeModules = await this.fileExists(path.join(nodeModulesPath, importName));

            if (!existsInNodeModules) {
                this.result.data.missing.push({
                    name: importName,
                    usedIn: usages.map(u => path.relative(this.projectPath, u.file)),
                    suggestDep: this.guessDependencyType(importName),
                    confidence: usages.length > 2 ? 'high' : 'medium'
                });
                this.result.data.summary.missing++;
            }
        }
    }

    isBuiltinModule(name) {
        const builtins = [
            'fs', 'path', 'http', 'https', 'url', 'querystring', 'util', 'events',
            'stream', 'buffer', 'crypto', 'os', 'child_process', 'cluster', 'dgram',
            'dns', 'net', 'readline', 'repl', 'tls', 'v8', 'vm', 'zlib', 'assert',
            'console', 'timers', 'tty', 'domain', 'punycode', 'constants', 'module'
        ];
        return builtins.includes(name);
    }

    guessDependencyType(importName) {
        if (importName.startsWith('@types/')) return 'devDependencies';
        if (importName.includes('test') || importName.includes('spec')) return 'devDependencies';
        if (importName.includes('lint') || importName.includes('format')) return 'devDependencies';
        return 'dependencies';
    }

    async findPhantomDependencies(dependencies, packageJson) {
        const nodeModulesPath = path.join(this.projectPath, 'node_modules');

        for (const [importName, usages] of this.importMap) {
            if (importName.startsWith('./') || importName.startsWith('../') ||
                importName.startsWith('/') || this.isBuiltinModule(importName)) {
                continue;
            }

            // Skip if it's a declared dependency
            if (dependencies.has(importName)) {
                continue;
            }

            // Check if it's a phantom dependency (exists but not declared)
            const modulePath = path.join(nodeModulesPath, importName);
            const packageJsonPath = path.join(modulePath, 'package.json');

            if (await this.fileExists(modulePath) && await this.fileExists(packageJsonPath)) {
                try {
                    const modulePackageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
                    const chain = await this.findDependencyChain(packageJson, importName);

                    this.result.data.phantom.push({
                        name: importName,
                        chain: chain || ['unknown'],
                        risk: this.assessPhantomRisk(chain),
                        reason: '如果直接依赖升级或移除，此依赖可能不可用',
                        version: modulePackageJson.version || 'unknown'
                    });
                    this.result.data.summary.phantom++;
                } catch (error) {
                    // Skip if can't read package.json
                }
            }
        }
    }

    async findDependencyChain(packageJson, targetDep, visited = new Set()) {
        const allDeps = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies
        };

        for (const [depName, version] of Object.entries(allDeps)) {
            if (visited.has(depName)) continue;
            visited.add(depName);

            const nodeModulesPath = path.join(this.projectPath, 'node_modules');
            const depPath = path.join(nodeModulesPath, depName);
            const depPackageJsonPath = path.join(depPath, 'package.json');

            if (await this.fileExists(depPackageJsonPath)) {
                try {
                    const depPackageJson = JSON.parse(await fs.readFile(depPackageJsonPath, 'utf-8'));

                    // Check if target is a direct dependency of this dependency
                    const depDeps = {
                        ...depPackageJson.dependencies,
                        ...depPackageJson.devDependencies
                    };

                    if (depDeps[targetDep]) {
                        return [depName, targetDep];
                    }

                    // Recursively check deeper
                    const deeperChain = await this.findDependencyChain(depPackageJson, targetDep, visited);
                    if (deeperChain) {
                        return [depName, ...deeperChain];
                    }
                } catch (error) {
                    // Skip if can't parse
                }
            }
        }

        return null;
    }

    assessPhantomRisk(chain) {
        if (!chain || chain.length === 0) return 'high';
        if (chain.length === 1) return 'low';
        if (chain.length <= 3) return 'medium';
        return 'high';
    }

    async detectCircularDependencies() {
        const visited = new Set();
        const recursionStack = new Set();

        for (const [file] of this.dependencyGraph) {
            if (!visited.has(file)) {
                const path = [];
                this.detectCircular(file, visited, recursionStack, path);
            }
        }

        this.result.data.circular = this.circularPaths;
        this.result.data.summary.circular = this.circularPaths.length;
    }

    detectCircular(file, visited, recursionStack, currentPath) {
        visited.add(file);
        recursionStack.add(file);
        currentPath.push(file);

        const deps = this.dependencyGraph.get(file) || [];

        for (const dep of deps) {
            // Convert relative imports to absolute paths
            const depFile = this.resolveImportPath(file, dep.module);

            if (!depFile) continue;

            if (recursionStack.has(depFile)) {
                // Found a cycle
                const cycleStart = currentPath.indexOf(depFile);
                const cycle = [...currentPath.slice(cycleStart), depFile];
                const cycleNames = cycle.map(f => path.relative(this.projectPath, f));

                this.circularPaths.push({
                    path: cycleNames,
                    severity: this.assessCycleSeverity(cycle.length)
                });
            } else if (!visited.has(depFile)) {
                this.detectCircular(depFile, visited, recursionStack, currentPath);
            }
        }

        recursionStack.delete(file);
        currentPath.pop();
    }

    resolveImportPath(fromFile, importPath) {
        // Skip node_modules and absolute imports
        if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
            return null;
        }

        const fromDir = path.dirname(fromFile);
        const resolved = path.resolve(fromDir, importPath);

        // Try different extensions
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '/index.js', '/index.ts'];

        for (const ext of extensions) {
            const fileWithExt = resolved + (ext.startsWith('/') ? ext : ext.replace(/^\./, ''));
            if (this.dependencyGraph.has(fileWithExt)) {
                return fileWithExt;
            }
        }

        return null;
    }

    assessCycleSeverity(cycleLength) {
        if (cycleLength <= 2) return 'high';
        if (cycleLength <= 4) return 'medium';
        return 'low';
    }

    async checkOutdatedDependencies(dependencies) {
        // This is a simplified implementation
        // In a real implementation, you might want to check npm registry
        for (const [depName, depInfo] of dependencies) {
            if (this.isLikelyOutdated(depInfo.version)) {
                this.result.data.outdated.push({
                    name: depName,
                    current: depInfo.version,
                    latest: this.guessLatestVersion(depInfo.version),
                    type: depInfo.type
                });
                this.result.data.summary.outdated++;
            }
        }
    }

    isLikelyOutdated(version) {
        // Simple heuristic: versions with old major versions might be outdated
        const majorVersion = parseInt(version.replace(/^[\^~<>=]/, ''));
        return majorVersion && majorVersion < 2;
    }

    guessLatestVersion(currentVersion) {
        // This is a placeholder - real implementation would check npm registry
        const majorVersion = parseInt(currentVersion.replace(/^[\^~<>=]/, ''));
        if (majorVersion && majorVersion < 2) {
            return `^${majorVersion + 1}.0.0`;
        }
        return currentVersion;
    }

    async checkSecurityVulnerabilities(dependencies) {
        // This is a simplified implementation
        // Real implementation would check vulnerability databases
        const knownVulnerable = [
            'lodash',
            'request',
            'axios' // Example only
        ];

        for (const [depName, depInfo] of dependencies) {
            if (knownVulnerable.includes(depName)) {
                this.result.data.vulnerable.push({
                    name: depName,
                    version: depInfo.version,
                    severity: 'medium',
                    recommendation: '升级到最新版本'
                });
                this.result.data.summary.vulnerable++;
            }
        }
    }

    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Usage: node analyze-dependencies.js <project_path> [options]');
        process.exit(1);
    }

    const projectPath = args[0];
    let options = {};

    if (args.length > 1) {
        try {
            options = JSON.parse(args[1]);
        } catch (error) {
            console.error('Options must be valid JSON');
            process.exit(1);
        }
    }

    const analyzer = new DependencyAnalyzer(projectPath, options);

    analyzer.analyze()
        .then(result => {
            console.log(JSON.stringify(result, null, 2));
        })
        .catch(error => {
            console.error('Analysis failed:', error.message);
            process.exit(1);
        });
}

module.exports = DependencyAnalyzer;