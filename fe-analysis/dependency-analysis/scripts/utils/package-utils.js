const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

class PackageUtils {
    static async getPackageInfo(packagePath) {
        const packageJsonPath = path.join(packagePath, 'package.json');

        try {
            const content = await fs.readFile(packageJsonPath, 'utf-8');
            const packageJson = JSON.parse(content);

            return {
                name: packageJson.name,
                version: packageJson.version,
                packageJson,
                size: await this.getPackageSize(packagePath)
            };
        } catch (error) {
            return null;
        }
    }

    static async getPackageSize(packagePath) {
        try {
            let totalSize = 0;
            const items = await fs.readdir(packagePath, { withFileTypes: true });

            for (const item of items) {
                const itemPath = path.join(packagePath, item.name);

                // Skip node_modules to avoid infinite recursion
                if (item.name === 'node_modules') continue;

                if (item.isDirectory()) {
                    totalSize += await this.getPackageSize(itemPath);
                } else {
                    const { size } = await fs.stat(itemPath);
                    totalSize += size;
                }
            }

            return totalSize;
        } catch (error) {
            return 0;
        }
    }

    static formatSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }

    static async getInstalledVersion(packageName, projectPath) {
        const nodeModulesPath = path.join(projectPath, 'node_modules');

        // Check direct installation
        const directPath = path.join(nodeModulesPath, packageName);
        const packageJsonPath = path.join(directPath, 'package.json');

        try {
            if (await this.fileExists(packageJsonPath)) {
                const content = await fs.readFile(packageJsonPath, 'utf-8');
                const packageJson = JSON.parse(content);
                return packageJson.version;
            }
        } catch (error) {
            // Continue to other checks
        }

        // Check if it's a scoped package
        if (packageName.startsWith('@')) {
            const [scope, name] = packageName.split('/');
            const scopedPath = path.join(nodeModulesPath, scope, name);
            const scopedPackageJsonPath = path.join(scopedPath, 'package.json');

            try {
                if (await this.fileExists(scopedPackageJsonPath)) {
                    const content = await fs.readFile(scopedPackageJsonPath, 'utf-8');
                    const packageJson = JSON.parse(content);
                    return packageJson.version;
                }
            } catch (error) {
                // Continue
            }
        }

        return null;
    }

    static async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    static categorizeDependency(packageName, packageJson = null) {
        // Development dependencies patterns
        const devPatterns = [
            /^@types\//,           // TypeScript types
            /test/,               // Test-related
            /spec/,               // Specification files
            /jest/,               // Jest testing framework
            /mocha/,              // Mocha testing framework
            /cypress/,            // Cypress e2e testing
            /storybook/,          // Storybook
            /webpack/,            // Webpack build tool
            /rollup/,             // Rollup bundler
            /vite/,               // Vite build tool
            /parcel/,             // Parcel bundler
            /babel/,              // Babel transpiler
            /typescript/,         // TypeScript compiler
            /eslint/,             // ESLint linter
            /prettier/,           // Prettier formatter
            /stylelint/,          // Stylelint linter
            /husky/,              // Git hooks
            /lint-staged/,        // Lint staged files
            /nodemon/,            // Development server
            /concurrently/,       // Run scripts concurrently
            /cross-env/,          // Cross-platform environment
            /dotenv/,             // Environment variables
            /rimraf/,             // rm -rf utility
            /mkdirp/              // mkdir -p utility
        ];

        // Production dependencies patterns
        const prodPatterns = [
            /^react$/,            // React core
            /react-dom/,          // React DOM
            /vue/,                // Vue.js
            /angular/,            // Angular
            /express/,            // Express.js
            /koa/,                // Koa.js
            /lodash/,             // Lodash utilities
            /axios/,              // HTTP client
            /moment/,             // Date manipulation
            /date-fns/,           // Date utilities
            /ramda/,              // Functional programming
            /rxjs/,               // Reactive extensions
            /@reduxjs/,           // Redux toolkit
            /react-router/,       // React router
            /vue-router/,         // Vue router
            /next/,               // Next.js
            /nuxt/,               // Nuxt.js
            /gatsby/,             // Gatsby
            /webpack/,            // Webpack runtime
            /@babel\/runtime/     // Babel runtime
        ];

        // Check if packageJson is provided and contains the dependency
        if (packageJson) {
            const allDeps = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies,
                ...packageJson.peerDependencies
            };

            if (allDeps[packageName]) {
                if (packageJson.devDependencies && packageJson.devDependencies[packageName]) {
                    return 'dev';
                }
                if (packageJson.peerDependencies && packageJson.peerDependencies[packageName]) {
                    return 'peer';
                }
                return 'prod';
            }
        }

        // Fallback to pattern matching
        if (devPatterns.some(pattern => pattern.test(packageName))) {
            return 'dev';
        }

        if (prodPatterns.some(pattern => pattern.test(packageName))) {
            return 'prod';
        }

        return 'prod'; // Default to production
    }

    static extractLicense(packageJson) {
        // Check explicit license field
        if (packageJson.license) {
            return packageJson.license;
        }

        // Check license file (simplified)
        const licenseFiles = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
        // In a real implementation, you'd read these files

        // Check common license patterns in README
        if (packageJson.repository || packageJson.description) {
            // This is simplified - real implementation would parse README
        }

        return 'Unknown';
    }

    static async getLatestVersion(packageName) {
        return new Promise((resolve) => {
            const process = spawn('npm', ['view', packageName, 'version'], {
                stdio: 'pipe',
                timeout: 5000
            });

            let output = '';
            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.on('close', (code) => {
                if (code === 0) {
                    const version = output.trim();
                    resolve(version);
                } else {
                    resolve(null);
                }
            });

            process.on('error', () => {
                resolve(null);
            });
        });
    }

    static isOutdated(currentVersion, latestVersion) {
        if (!currentVersion || !latestVersion) {
            return false;
        }

        try {
            const cleanCurrent = this.cleanVersion(currentVersion);
            const cleanLatest = this.cleanVersion(latestVersion);

            return semver.lt(cleanCurrent, cleanLatest);
        } catch (error) {
            // Simple string comparison fallback
            return currentVersion !== latestVersion;
        }
    }

    static cleanVersion(version) {
        // Remove operators and clean version string
        return version.replace(/^[\^~<>=]/, '').split(' ')[0];
    }

    static async getDependencyTree(packageName, projectPath, maxDepth = 5) {
        const visited = new Set();
        const tree = await this.buildDependencyTree(packageName, projectPath, visited, 0, maxDepth);
        return tree;
    }

    static async buildDependencyTree(packageName, projectPath, visited, depth, maxDepth) {
        if (depth >= maxDepth || visited.has(packageName)) {
            return null;
        }

        visited.add(packageName);

        const packagePath = path.join(projectPath, 'node_modules', packageName);
        const packageInfo = await this.getPackageInfo(packagePath);

        if (!packageInfo) {
            return {
                name: packageName,
                version: 'unknown',
                dependencies: []
            };
        }

        const dependencies = packageInfo.packageJson.dependencies || {};
        const depList = [];

        for (const [depName, version] of Object.entries(dependencies)) {
            const depTree = await this.buildDependencyTree(depName, projectPath, visited, depth + 1, maxDepth);
            if (depTree) {
                depList.push(depTree);
            }
        }

        return {
            name: packageName,
            version: packageInfo.version,
            size: packageInfo.size,
            dependencies: depList
        };
    }
}

module.exports = PackageUtils;