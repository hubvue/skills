#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TestConfigGenerator {
  constructor(projectPath, framework, options = {}) {
    this.projectPath = projectPath;
    this.framework = framework;
    this.options = {
      typescript: false,
      react: false,
      vue: false,
      coverage: true,
      environment: 'jsdom',
      ...options
    };
  }

  generate() {
    const configs = [];

    // 主配置文件
    const mainConfig = this.generateMainConfig();
    if (mainConfig) {
      configs.push(mainConfig);
    }

    // Package.json脚本
    const packageJsonScripts = this.generatePackageJsonScripts();
    if (packageJsonScripts) {
      configs.push(packageJsonScripts);
    }

    // TypeScript配置
    if (this.options.typescript) {
      const tsConfig = this.generateTypeScriptConfig();
      if (tsConfig) {
        configs.push(tsConfig);
      }
    }

    // ESLint测试配置
    const eslintConfig = this.generateESLintConfig();
    if (eslintConfig) {
      configs.push(eslintConfig);
    }

    return configs;
  }

  generateMainConfig() {
    switch (this.framework) {
      case 'jest':
        return this.generateJestConfig();
      case 'vitest':
        return this.generateViteConfig();
      case 'mocha':
        return this.generateMochaConfig();
      default:
        return null;
    }
  }

  generateJestConfig() {
    const config = {
      testEnvironment: this.options.environment,
      roots: ['<rootDir>/src', '<rootDir>/test', '<rootDir>/tests'],
      testMatch: [
        '**/__tests__/**/*.(js|jsx|ts|tsx)',
        '**/*.(test|spec).(js|jsx|ts|tsx)'
      ],
      transform: {},
      collectCoverageFrom: [
        'src/**/*.(js|jsx|ts|tsx)',
        '!src/**/*.d.ts',
        '!src/index.js',
        '!src/**/*.stories.js'
      ],
      setupFilesAfterEnv: [],
      moduleNameMapping: {}
    };

    // TypeScript支持
    if (this.options.typescript) {
      config.preset = 'ts-jest';
      config.testMatch.push('**/*.test.(ts|tsx)');
    }

    // React支持
    if (this.options.react) {
      config.setupFilesAfterEnv.push('<rootDir>/src/setupTests.js');
      config.moduleNameMapping = {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      };
    }

    // Vue支持
    if (this.options.vue) {
      config.moduleFileExtensions = ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'];
      config.transform = {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest'
      };
    }

    // 覆盖率配置
    if (this.options.coverage) {
      config.collectCoverage = true;
      config.coverageDirectory = 'coverage';
      config.coverageReporters = ['text', 'lcov', 'html'];
      config.coverageThreshold = {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70
        }
      };
    }

    return {
      filename: 'jest.config.js',
      content: `const config = ${JSON.stringify(config, null, 2)};

module.exports = config;`
    };
  }

  generateViteConfig() {
    const testConfig = {
      globals: true,
      environment: this.options.environment,
      setupFiles: []
    };

    // TypeScript支持
    if (this.options.typescript) {
      // Vitest自动支持TypeScript
    }

    // React支持
    if (this.options.react) {
      testConfig.setupFiles.push('./src/setupTests.ts');
    }

    return {
      filename: 'vitest.config.js',
      content: `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    ${this.options.react ? 'react(),' : ''}
    ${this.options.vue ? 'vue(),' : ''}
  ],
  test: ${JSON.stringify(testConfig, null, 2)},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});`
    };
  }

  generateMochaConfig() {
    return {
      filename: '.mocharc.json',
      content: JSON.stringify({
        spec: ['test/**/*.spec.js', 'test/**/*.test.js', 'src/**/*.test.js'],
        require: [],
        reporter: 'spec',
        timeout: 5000,
        recursive: true
      }, null, 2)
    };
  }

  generatePackageJsonScripts() {
    const scripts = {};

    switch (this.framework) {
      case 'jest':
        scripts.test = 'jest';
        scripts['test:watch'] = 'jest --watch';
        scripts['test:coverage'] = 'jest --coverage';
        if (this.options.coverage) {
          scripts['test:ci'] = 'jest --coverage --watchAll=false --ci';
        }
        break;

      case 'vitest':
        scripts.test = 'vitest';
        scripts['test:watch'] = 'vitest --watch';
        scripts['test:ui'] = 'vitest --ui';
        scripts['test:coverage'] = 'vitest --coverage';
        if (this.options.coverage) {
          scripts['test:ci'] = 'vitest --coverage --reporter=verbose';
        }
        break;

      case 'mocha':
        scripts.test = 'mocha';
        scripts['test:watch'] = 'mocha --watch';
        if (this.options.coverage) {
          scripts['test:coverage'] = 'nyc mocha';
          scripts['test:ci'] = 'nyc mocha --reporter=json';
        }
        break;
    }

    return {
      type: 'packageJson',
      content: scripts
    };
  }

  generateTypeScriptConfig() {
    return {
      filename: 'tsconfig.test.json',
      content: JSON.stringify({
        extends: './tsconfig.json',
        compilerOptions: {
          module: 'commonjs',
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          types: ['jest', 'node']
        },
        include: [
          'src/**/*',
          'test/**/*',
          'tests/**/*',
          '__tests__/**/*'
        ]
      }, null, 2)
    };
  }

  generateESLintConfig() {
    const overrides = [
      {
        files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
        env: {
          jest: this.framework === 'jest',
          mocha: this.framework === 'mocha',
          node: true
        },
        rules: {
          'import/no-extraneous-dependencies': 'off',
          'no-unused-expressions': 'off'
        }
      }
    ];

    return {
      type: 'eslintConfig',
      content: {
        overrides
      }
    };
  }

  writeConfigs() {
    const configs = this.generate();
    const writtenFiles = [];

    // 确保目录存在
    const ensureDir = (filePath) => {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    };

    configs.forEach(config => {
      if (config.type === 'packageJson') {
        // 更新package.json
        const packageJsonPath = path.join(this.projectPath, 'package.json');
        let packageJson = {};

        if (fs.existsSync(packageJsonPath)) {
          packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        }

        packageJson.scripts = {
          ...packageJson.scripts,
          ...config.content
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        writtenFiles.push('package.json (updated scripts)');
      } else if (config.type === 'eslintConfig') {
        // 更新ESLint配置
        const eslintConfigPath = path.join(this.projectPath, '.eslintrc.json');
        let eslintConfig = {};

        if (fs.existsSync(eslintConfigPath)) {
          eslintConfig = JSON.parse(fs.readFileSync(eslintConfigPath, 'utf8'));
        }

        eslintConfig.overrides = config.content.overrides;

        fs.writeFileSync(eslintConfigPath, JSON.stringify(eslintConfig, null, 2) + '\n');
        writtenFiles.push('.eslintrc.json (updated test overrides)');
      } else {
        // 写入配置文件
        const configPath = path.join(this.projectPath, config.filename);
        ensureDir(configPath);

        fs.writeFileSync(configPath, config.content + '\n');
        writtenFiles.push(config.filename);
      }
    });

    return writtenFiles;
  }

  getDependencies() {
    const dependencies = [];
    const devDependencies = [];

    switch (this.framework) {
      case 'jest':
        devDependencies.push('jest');
        if (this.options.typescript) {
          devDependencies.push('ts-jest', '@types/jest');
        }
        if (this.options.react) {
          devDependencies.push('@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event');
        }
        if (this.options.vue) {
          devDependencies.push('@vue/vue3-jest', '@vue/test-utils');
        }
        break;

      case 'vitest':
        devDependencies.push('vitest');
        if (this.options.typescript) {
          devDependencies.push('@vitest/ui');
        }
        if (this.options.react) {
          devDependencies.push('@vitejs/plugin-react', '@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event');
        }
        if (this.options.vue) {
          devDependencies.push('@vitejs/plugin-vue', '@vue/test-utils');
        }
        break;

      case 'mocha':
        devDependencies.push('mocha', 'chai');
        if (this.options.typescript) {
          devDependencies.push('ts-node', '@types/mocha', '@types/chai');
        }
        if (this.options.coverage) {
          devDependencies.push('nyc');
        }
        break;
    }

    return {
      dependencies,
      devDependencies
    };
  }
}

module.exports = TestConfigGenerator;

// CLI用法
if (require.main === module) {
  const framework = process.argv[2];
  const options = process.argv[3] ? JSON.parse(process.argv[3]) : {};
  const projectPath = process.argv[4] || process.cwd();

  if (!framework) {
    console.error('Please provide a framework (jest, vitest, or mocha)');
    process.exit(1);
  }

  const generator = new TestConfigGenerator(projectPath, framework, options);

  try {
    const writtenFiles = generator.writeConfigs();
    console.log('Generated configuration files:');
    writtenFiles.forEach(file => console.log(`  - ${file}`));

    const deps = generator.getDependencies();
    if (deps.devDependencies.length > 0) {
      console.log('\nInstall dependencies:');
      console.log(`npm install --save-dev ${deps.devDependencies.join(' ')}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}