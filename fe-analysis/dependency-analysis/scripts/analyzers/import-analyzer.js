const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

class ImportAnalyzer {
    constructor(projectPath, options = {}) {
        this.projectPath = projectPath;
        this.options = options;
        this.tsConfig = null;
        this.aliases = {};
        this.importMap = new Map();
        this.fileExtensions = options.fileExtensions || ['.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'];
        this.builtinModules = new Set([
            'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
            'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https',
            'module', 'net', 'os', 'path', 'punycode', 'querystring', 'readline',
            'repl', 'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty',
            'url', 'util', 'v8', 'vm', 'zlib'
        ]);
    }

    async initialize() {
        // Load TypeScript configuration if available
        await this.loadTsConfig();
        // Load build tool configurations for aliases
        await this.loadAliases();
    }

    async analyzeFiles(filePaths) {
        const imports = new Map();

        for (const filePath of filePaths) {
            const fileImports = await this.analyzeFile(filePath);
            fileImports.forEach(imp => {
                if (!imports.has(imp.module)) {
                    imports.set(imp.module, []);
                }
                imports.get(imp.module).push({
                    file: filePath,
                    line: imp.line,
                    type: imp.type,
                    dynamic: imp.dynamic
                });
            });
        }

        return imports;
    }

    async analyzeFile(filePath) {
        try {
            const content = await fsPromises.readFile(filePath, 'utf-8');
            const imports = [];

            // Handle different file types
            if (filePath.endsWith('.vue')) {
                imports.push(...await this.extractVueImports(content, filePath));
            } else if (filePath.endsWith('.svelte')) {
                imports.push(...await this.extractSvelteImports(content, filePath));
            } else if (filePath.endsWith('.css') || filePath.endsWith('.scss') || filePath.endsWith('.sass')) {
                imports.push(...this.extractStyleImports(content, filePath));
            } else {
                // JavaScript/TypeScript files
                imports.push(...await this.extractJsTsImports(content, filePath));
            }

            return imports;
        } catch (error) {
            return [];
        }
    }

    async extractJsTsImports(content, filePath) {
        const imports = [];
        const isTS = filePath.endsWith('.ts') || filePath.endsWith('.tsx');

        try {
            const parserOptions = {
                sourceType: 'module',
                ecmaVersion: 'latest',
                allowHashBang: true,
                allowReturnOutsideFunction: true,
                plugins: isTS ? ['typescript'] : []
            };

            const ast = acorn.parse(content, parserOptions);

            walk.simple(ast, {
                ImportDeclaration(node) {
                    imports.push({
                        module: node.source.value,
                        type: 'import',
                        line: node.loc?.start?.line || 0,
                        dynamic: false
                    });
                },
                ExportNamedDeclaration(node) {
                    if (node.source) {
                        imports.push({
                            module: node.source.value,
                            type: 'export',
                            line: node.loc?.start?.line || 0,
                            dynamic: false
                        });
                    }
                },
                ExportAllDeclaration(node) {
                    imports.push({
                        module: node.source.value,
                        type: 'export',
                        line: node.loc?.start?.line || 0,
                        dynamic: false
                    });
                },
                CallExpression(node) {
                    // Dynamic imports
                    if (node.callee.type === 'Import') {
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            imports.push({
                                module: arg.value,
                                type: 'dynamic-import',
                                line: node.loc?.start?.line || 0,
                                dynamic: true
                            });
                        }
                    }

                    // require() calls
                    if (node.callee.type === 'Identifier' && node.callee.name === 'require' &&
                        node.arguments.length > 0) {
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            imports.push({
                                module: arg.value,
                                type: 'require',
                                line: node.loc?.start?.line || 0,
                                dynamic: false
                            });
                        }
                    }

                    // require.resolve()
                    if (node.callee.type === 'MemberExpression' &&
                        node.callee.object?.name === 'require' &&
                        node.callee.property?.name === 'resolve' &&
                        node.arguments.length > 0) {
                        const arg = node.arguments[0];
                        if (arg.type === 'Literal' && typeof arg.value === 'string') {
                            imports.push({
                                module: arg.value,
                                type: 'require-resolve',
                                line: node.loc?.start?.line || 0,
                                dynamic: false
                            });
                        }
                    }
                },
                ImportExpression(node) {
                    // ES2020 dynamic import
                    const source = node.source;
                    if (source.type === 'Literal') {
                        imports.push({
                            module: source.value,
                            type: 'dynamic-import',
                            line: node.loc?.start?.line || 0,
                            dynamic: true
                        });
                    }
                }
            });
        } catch (error) {
            // Fallback to regex extraction for complex cases
            imports.push(...this.extractImportsWithRegex(content));
        }

        return imports;
    }

    async extractVueImports(content, filePath) {
        const imports = [];

        // Extract script section
        const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
        if (scriptMatch) {
            const scriptContent = scriptMatch[1];
            imports.push(...await this.extractJsTsImports(scriptContent, filePath));
        }

        // Extract template imports (e.g., dynamic components)
        const templateMatch = content.match(/<template[^>]*>([\s\S]*?)<\/template>/);
        if (templateMatch) {
            const templateContent = templateMatch[1];
            // Look for dynamic component imports
            const dynamicImportMatch = templateContent.match(/import\s*\(\s*['"`]([^'"`]+)['"`]/g);
            if (dynamicImportMatch) {
                dynamicImportMatch.forEach(match => {
                    const importMatch = match.match(/import\s*\(\s*['"`]([^'"`]+)['"`]/);
                    if (importMatch) {
                        imports.push({
                            module: importMatch[1],
                            type: 'template-dynamic-import',
                            line: 0,
                            dynamic: true
                        });
                    }
                });
            }
        }

        // Extract style imports
        const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
        if (styleMatches) {
            styleMatches.forEach(styleSection => {
                imports.push(...this.extractStyleImports(styleSection, filePath));
            });
        }

        return imports;
    }

    async extractSvelteImports(content, filePath) {
        const imports = [];

        // Svelte uses regular script tags
        const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
        if (scriptMatch) {
            imports.push(...await this.extractJsTsImports(scriptMatch[1], filePath));
        }

        // Extract style imports
        const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        if (styleMatch) {
            imports.push(...this.extractStyleImports(styleMatch[1], filePath));
        }

        return imports;
    }

    extractStyleImports(content, filePath) {
        const imports = [];
        const lines = content.split('\n');

        lines.forEach((line, index) => {
            // CSS @import
            const cssImportMatch = line.match(/@import\s+(?:url\s*\(\s*)?['"`]([^'"`]+)['"`]/);
            if (cssImportMatch) {
                imports.push({
                    module: cssImportMatch[1],
                    type: 'css-import',
                    line: index + 1,
                    dynamic: false
                });
            }

            // SCSS @use and @forward
            const scssUseMatch = line.match(/@(use|forward)\s+['"`]([^'"`]+)['"`]/);
            if (scssUseMatch) {
                imports.push({
                    module: scssUseMatch[2],
                    type: `scss-${scssUseMatch[1]}`,
                    line: index + 1,
                    dynamic: false
                });
            }
        });

        return imports;
    }

    extractImportsWithRegex(content) {
        const imports = [];
        const lines = content.split('\n');

        const patterns = [
            { regex: /^import\s+.*?from\s+['"`]([^'"`]+)['"`]/, type: 'import' },
            { regex: /import\s*\(\s*['"`]([^'"`]+)['"`]/, type: 'dynamic-import' },
            { regex: /export\s+.*?from\s+['"`]([^'"`]+)['"`]/, type: 'export' },
            { regex: /require\s*\(\s*['"`]([^'"`]+)['"`]/, type: 'require' },
            { regex: /require\.resolve\s*\(\s*['"`]([^'"`]+)['"`]/, type: 'require-resolve' }
        ];

        lines.forEach((line, index) => {
            patterns.forEach(({ regex, type }) => {
                const match = line.match(regex);
                if (match) {
                    imports.push({
                        module: match[1],
                        type,
                        line: index + 1,
                        dynamic: type.includes('dynamic')
                    });
                }
            });
        });

        return imports;
    }

    resolveImportPath(importName, fromFile) {
        // Skip external modules
        if (!this.isRelativeImport(importName)) {
            return importName;
        }

        const fromDir = path.dirname(fromFile);
        let resolved = path.resolve(fromDir, importName);

        // Handle TypeScript path mapping
        if (this.tsConfig && this.tsConfig.compilerOptions?.paths) {
            resolved = this.resolveTypeScriptPath(importName) || resolved;
        }

        // Handle custom aliases
        resolved = this.resolveAlias(importName) || resolved;

        // Try different extensions
        const extensions = ['', '.js', '.jsx', '.ts', '.tsx', '.json', '/index.js', '/index.ts'];

        for (const ext of extensions) {
            const fileWithExt = resolved + (ext.startsWith('/') ? '' : ext);
            if (fs.existsSync(fileWithExt)) {
                return fileWithExt;
            }
        }

        return resolved;
    }

    isRelativeImport(importName) {
        return importName.startsWith('./') || importName.startsWith('../');
    }

    isBuiltinModule(importName) {
        return this.builtinModules.has(importName);
    }

    categorizeImport(importName) {
        if (this.isBuiltinModule(importName)) {
            return 'builtin';
        }
        if (this.isRelativeImport(importName)) {
            return 'relative';
        }
        if (this.isAlias(importName)) {
            return 'alias';
        }
        return 'external';
    }

    isAlias(importName) {
        return Object.keys(this.aliases).some(alias => {
            if (alias.endsWith('*')) {
                return importName.startsWith(alias.slice(0, -1));
            }
            return importName === alias;
        });
    }

    resolveAlias(importName) {
        for (const [alias, target] of Object.entries(this.aliases)) {
            if (alias.endsWith('*')) {
                const prefix = alias.slice(0, -1);
                if (importName.startsWith(prefix)) {
                    const suffix = importName.slice(prefix.length);
                    return path.resolve(this.projectPath, target.slice(0, -1) + suffix);
                }
            } else if (importName === alias) {
                return path.resolve(this.projectPath, target);
            }
        }
        return null;
    }

    async loadTsConfig() {
        const tsConfigPath = path.join(this.projectPath, 'tsconfig.json');
        if (await this.fileExists(tsConfigPath)) {
            try {
                const content = await fsPromises.readFile(tsConfigPath, 'utf-8');
                this.tsConfig = JSON.parse(content);
            } catch (error) {
                // Invalid tsconfig.json
            }
        }
    }

    resolveTypeScriptPath(importName) {
        if (!this.tsConfig?.compilerOptions?.paths) {
            return null;
        }

        const baseUrl = this.tsConfig.compilerOptions.baseUrl || '.';
        const baseDir = path.resolve(this.projectPath, baseUrl);

        for (const [pattern, targets] of Object.entries(this.tsConfig.compilerOptions.paths)) {
            if (pattern.endsWith('*')) {
                const prefix = pattern.slice(0, -1);
                if (importName.startsWith(prefix)) {
                    const suffix = importName.slice(prefix.length);
                    const target = targets[0];
                    if (target.endsWith('*')) {
                        const resolved = target.slice(0, -1) + suffix;
                        return path.resolve(baseDir, resolved);
                    }
                }
            } else if (importName === pattern) {
                return path.resolve(baseDir, targets[0]);
            }
        }

        return null;
    }

    async loadAliases() {
        // Load from various config files
        await this.loadViteAliases();
        await this.loadWebpackAliases();
        await this.loadJestAliases();
    }

    async loadViteAliases() {
        const viteConfigPath = path.join(this.projectPath, 'vite.config.js');
        if (await this.fileExists(viteConfigPath)) {
            try {
                // This is a simplified approach - in real implementation, you'd want to use dynamic import
                const content = await fsPromises.readFile(viteConfigPath, 'utf-8');
                const aliasMatch = content.match(/resolve:\s*\{[^}]*alias:\s*\{([^}]*)\}/);
                if (aliasMatch) {
                    // Extract aliases with regex (simplified)
                    const aliasRegex = /['"`]([^'"`]+)['"`]\s*:\s*['"`]([^'"`]+)['"`]/g;
                    let match;
                    while ((match = aliasRegex.exec(aliasMatch[1])) !== null) {
                        this.aliases[match[1]] = match[2];
                    }
                }
            } catch (error) {
                // Ignore config parsing errors
            }
        }
    }

    async loadWebpackAliases() {
        const webpackConfigPath = path.join(this.projectPath, 'webpack.config.js');
        if (await this.fileExists(webpackConfigPath)) {
            try {
                const content = await fsPromises.readFile(webpackConfigPath, 'utf-8');
                const aliasMatch = content.match(/resolve:\s*\{[^}]*alias:\s*\{([^}]*)\}/);
                if (aliasMatch) {
                    const aliasRegex = /['"`]([^'"`]+)['"`]\s*:\s*path\.resolve\([^)]*\)/g;
                    let match;
                    while ((match = aliasRegex.exec(aliasMatch[1])) !== null) {
                        // Simplified extraction
                        this.aliases[match[1]] = match[1];
                    }
                }
            } catch (error) {
                // Ignore config parsing errors
            }
        }
    }

    async loadJestAliases() {
        const jestConfigPath = path.join(this.projectPath, 'jest.config.js');
        if (await this.fileExists(jestConfigPath)) {
            try {
                const content = await fsPromises.readFile(jestConfigPath, 'utf-8');
                const moduleNameMatch = content.match(/moduleNameMapping:\s*\{([^}]*)\}/);
                if (moduleNameMatch) {
                    const aliasRegex = /['"`]([^'"`]+)['"`]\s*:\s*['"`]([^'"`]+)['"`]/g;
                    let match;
                    while ((match = aliasRegex.exec(moduleNameMatch[1])) !== null) {
                        this.aliases[match[1]] = match[2];
                    }
                }
            } catch (error) {
                // Ignore config parsing errors
            }
        }
    }

    async fileExists(filePath) {
        try {
            await fsPromises.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = ImportAnalyzer;