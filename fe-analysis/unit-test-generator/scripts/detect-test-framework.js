#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TestFrameworkDetector {
  constructor(projectPath) {
    this.projectPath = projectPath;
  }

  detect() {
    const packageJsonPath = path.join(this.projectPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      return { hasTesting: false };
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // 检测测试框架
    const frameworks = this.detectFrameworks(packageJson);

    // 检测断言库
    const assertions = this.detectAssertions(packageJson);

    // 检测测试工具
    const utilities = this.detectUtilities(packageJson);

    // 检测测试环境配置
    const configFiles = this.detectConfigFiles();

    // 检测测试文件结构
    const testStructure = this.detectTestStructure();

    return {
      hasTesting: frameworks.length > 0,
      frameworks,
      assertions,
      utilities,
      configFiles,
      testStructure,
      recommendations: this.generateRecommendations(frameworks, assertions, utilities)
    };
  }

  detectFrameworks(packageJson) {
    const devDeps = packageJson.devDependencies || {};
    const deps = packageJson.dependencies || {};
    const allDeps = { ...devDeps, ...deps };

    const frameworks = [];

    // Jest
    if (allDeps.jest) {
      frameworks.push({
        name: 'jest',
        version: allDeps.jest,
        type: 'framework',
        configFiles: ['jest.config.js', 'jest.config.json', 'jest.config.ts']
      });
    }

    // Vitest
    if (allDeps.vitest) {
      frameworks.push({
        name: 'vitest',
        version: allDeps.vitest,
        type: 'framework',
        configFiles: ['vitest.config.js', 'vitest.config.ts']
      });
    }

    // Mocha
    if (allDeps.mocha) {
      frameworks.push({
        name: 'mocha',
        version: allDeps.mocha,
        type: 'framework',
        requiresRunner: true
      });
    }

    // Jasmine
    if (allDeps.jasmine) {
      frameworks.push({
        name: 'jasmine',
        version: allDeps.jasmine,
        type: 'framework'
      });
    }

    // Testing Library (作为补充框架)
    if (allDeps['@testing-library/react']) {
      frameworks.push({
        name: '@testing-library/react',
        version: allDeps['@testing-library/react'],
        type: 'utility',
        for: 'react'
      });
    }

    if (allDeps['@testing-library/vue']) {
      frameworks.push({
        name: '@testing-library/vue',
        version: allDeps['@testing-library/vue'],
        type: 'utility',
        for: 'vue'
      });
    }

    if (allDeps['@testing-library/angular']) {
      frameworks.push({
        name: '@testing-library/angular',
        version: allDeps['@testing-library/angular'],
        type: 'utility',
        for: 'angular'
      });
    }

    return frameworks;
  }

  detectAssertions(packageJson) {
    const devDeps = packageJson.devDependencies || {};
    const deps = packageJson.dependencies || {};
    const allDeps = { ...devDeps, ...deps };

    const assertions = [];

    // Chai
    if (allDeps.chai) {
      assertions.push({ name: 'chai', version: allDeps.chai });
    }

    // Expect (Jest内置)
    if (allDeps.jest) {
      assertions.push({ name: 'expect', version: 'builtin', framework: 'jest' });
    }

    // Assert (Node.js内置)
    assertions.push({ name: 'assert', version: 'builtin', framework: 'node' });

    // Should.js
    if (allDeps.should) {
      assertions.push({ name: 'should', version: allDeps.should });
    }

    return assertions;
  }

  detectUtilities(packageJson) {
    const devDeps = packageJson.devDependencies || {};
    const deps = packageJson.dependencies || {};
    const allDeps = { ...devDeps, ...deps };

    const utilities = [];

    // Sinon (用于mocking)
    if (allDeps.sinon) {
      utilities.push({ name: 'sinon', version: allDeps.sinon, type: 'mocking' });
    }

    // Test utilities
    if (allDeps['@testing-library/jest-dom']) {
      utilities.push({ name: '@testing-library/jest-dom', version: allDeps['@testing-library/jest-dom'], type: 'dom-matchers' });
    }

    if (allDeps['@testing-library/user-event']) {
      utilities.push({ name: '@testing-library/user-event', version: allDeps['@testing-library/user-event'], type: 'user-interaction' });
    }

    // Cypress utilities
    if (allDeps.cypress) {
      utilities.push({ name: 'cypress', version: allDeps.cypress, type: 'e2e-testing' });
    }

    return utilities;
  }

  detectConfigFiles() {
    const configFiles = [];
    const projectPath = this.projectPath;

    // Jest配置
    const jestConfigs = ['jest.config.js', 'jest.config.json', 'jest.config.ts', 'package.json'];
    jestConfigs.forEach(config => {
      if (fs.existsSync(path.join(projectPath, config))) {
        configFiles.push({ framework: 'jest', file: config });
      }
    });

    // Vitest配置
    const vitestConfigs = ['vitest.config.js', 'vitest.config.ts', 'vite.config.js', 'vite.config.ts'];
    vitestConfigs.forEach(config => {
      if (fs.existsSync(path.join(projectPath, config))) {
        configFiles.push({ framework: 'vitest', file: config });
      }
    });

    // Mocha配置
    const mochaConfigs = ['mocha.opts', '.mocharc.js', '.mocharc.json'];
    mochaConfigs.forEach(config => {
      if (fs.existsSync(path.join(projectPath, config))) {
        configFiles.push({ framework: 'mocha', file: config });
      }
    });

    return configFiles;
  }

  detectTestStructure() {
    const projectPath = this.projectPath;
    const testPatterns = [
      '**/*.test.js',
      '**/*.test.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.js',
      '**/*.spec.jsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/__tests__/**/*.js',
      '**/__tests__/**/*.jsx',
      '**/__tests__/**/*.ts',
      '**/__tests__/**/*.tsx',
      'test/**/*.js',
      'tests/**/*.js',
      'test/**/*.ts',
      'tests/**/*.ts'
    ];

    const foundTestFiles = [];

    testPatterns.forEach(pattern => {
      // 简化版检测，实际应该使用glob库
      const testDir = path.join(projectPath, 'test');
      const testsDir = path.join(projectPath, 'tests');
      const srcTestsDir = path.join(projectPath, 'src', '__tests__');

      if (fs.existsSync(testDir)) {
        foundTestFiles.push({ pattern: 'test/', type: 'directory' });
      }
      if (fs.existsSync(testsDir)) {
        foundTestFiles.push({ pattern: 'tests/', type: 'directory' });
      }
      if (fs.existsSync(srcTestsDir)) {
        foundTestFiles.push({ pattern: 'src/__tests__/', type: 'directory' });
      }
    });

    return {
      patterns: testPatterns,
      found: foundTestFiles
    };
  }

  generateRecommendations(frameworks, assertions, utilities) {
    const recommendations = [];

    if (frameworks.length === 0) {
      recommendations.push({
        type: 'setup',
        priority: 'high',
        message: '项目未配置测试框架',
        options: [
          { framework: 'jest', description: 'Jest - Facebook开发的零配置测试框架' },
          { framework: 'vitest', description: 'Vitest - 基于Vite的现代测试框架' },
          { framework: 'mocha', description: 'Mocha - 灵活可配置的测试框架' }
        ]
      });
    }

    const hasReactTestingLibrary = utilities.some(u => u.name === '@testing-library/react');
    const hasVueTestingLibrary = utilities.some(u => u.name === '@testing-library/vue');
    const hasAngularTestingLibrary = utilities.some(u => u.name === '@testing-library/angular');

    if (!hasReactTestingLibrary && !hasVueTestingLibrary && !hasAngularTestingLibrary) {
      recommendations.push({
        type: 'enhancement',
        priority: 'medium',
        message: '考虑添加组件测试库',
        options: [
          { framework: '@testing-library/react', for: 'React' },
          { framework: '@testing-library/vue', for: 'Vue' },
          { framework: '@testing-library/angular', for: 'Angular' }
        ]
      });
    }

    const hasMockingUtility = utilities.some(u => u.type === 'mocking');
    if (!hasMockingUtility) {
      recommendations.push({
        type: 'enhancement',
        priority: 'medium',
        message: '考虑添加Mock工具',
        options: [
          { framework: 'sinon', description: '强大的mock/spy/stub库' },
          { framework: 'jest-mock', description: 'Jest内置的mock功能' }
        ]
      });
    }

    return recommendations;
  }
}

module.exports = TestFrameworkDetector;

// CLI用法
if (require.main === module) {
  const projectPath = process.argv[2] || process.cwd();
  const detector = new TestFrameworkDetector(projectPath);
  const result = detector.detect();
  console.log(JSON.stringify(result, null, 2));
}