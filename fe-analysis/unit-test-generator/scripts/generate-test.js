#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TestGenerator {
  constructor(projectPath, options = {}) {
    this.projectPath = projectPath;
    this.options = {
      framework: 'jest',
      assertionStyle: 'expect',
      includeMocks: true,
      testType: 'unit', // unit, integration, e2e
      ...options
    };
  }

  generateForFile(filePath) {
    const fullPath = path.resolve(this.projectPath, filePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const ext = path.extname(filePath);

    let analysis;
    if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
      analysis = this.analyzeJSFile(content, filePath);
    } else {
      throw new Error(`Unsupported file type: ${ext}`);
    }

    const testContent = this.generateTestCode(analysis);
    const testPath = this.generateTestPath(filePath);

    return {
      testPath,
      testContent,
      analysis
    };
  }

  analyzeJSFile(content, filePath) {
    // 简化的AST分析，实际项目中应使用@babel/parser或typescript
    const analysis = {
      filePath,
      exports: [],
      imports: [],
      functions: [],
      classes: [],
      components: [],
      isReactComponent: false,
      isVueComponent: false,
      isTypeScript: path.extname(filePath) === '.ts' || path.extname(filePath) === '.tsx'
    };

    // 检测React组件
    if (content.includes('import React') ||
        content.includes('from \'react\'') ||
        content.includes('from "react"') ||
        content.includes('React.createElement')) {
      analysis.isReactComponent = true;
    }

    // 检测Vue组件
    if (content.includes('export default') &&
        (content.includes('template:') || content.includes('defineComponent'))) {
      analysis.isVueComponent = true;
    }

    // 提取导出
    const exportMatches = content.match(/export\s+(default\s+)?(const|let|var|function|class)\s+(\w+)/g);
    if (exportMatches) {
      exportMatches.forEach(match => {
        const name = match.match(/\w+(?!.*\w)/)[0];
        const isDefault = match.includes('export default');
        analysis.exports.push({ name, isDefault });
      });
    }

    // 提取函数
    const functionMatches = content.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|\([^)]*\)\s*{))/g);
    if (functionMatches) {
      functionMatches.forEach(match => {
        const name = match.match(/\w+/)[0];
        analysis.functions.push(name);
      });
    }

    // 提取类
    const classMatches = content.match(/class\s+(\w+)/g);
    if (classMatches) {
      classMatches.forEach(match => {
        const name = match.match(/class\s+(\w+)/)[1];
        analysis.classes.push(name);
      });
    }

    // 提取导入
    const importMatches = content.match(/import.*from\s+['"][^'"]+['"]/g) || [];
    analysis.imports = importMatches;

    // 提取组件（React函数组件）
    if (analysis.isReactComponent) {
      const componentMatches = content.match(/(?:const|let|var)\s+([A-Z]\w*)\s*=\s*(?:\([^)]*\)\s*=>|\([^)]*\)\s*{)/g);
      if (componentMatches) {
        componentMatches.forEach(match => {
          const name = match.match(/[A-Z]\w*/)[0];
          analysis.components.push({ name, type: 'functional' });
        });
      }
    }

    return analysis;
  }

  generateTestCode(analysis) {
    const { framework, assertionStyle, testType } = this.options;

    let testCode = '';

    // 添加导入
    const imports = this.generateImports(analysis);
    if (imports.length > 0) {
      testCode += imports.join('\n') + '\n\n';
    }

    // 根据不同类型的代码生成测试
    if (analysis.isReactComponent) {
      testCode += this.generateReactComponentTests(analysis, framework);
    } else if (analysis.isVueComponent) {
      testCode += this.generateVueComponentTests(analysis, framework);
    } else {
      testCode += this.generateJSTests(analysis, framework);
    }

    return testCode;
  }

  generateImports(analysis) {
    const imports = [];

    // 导入被测试的模块
    if (analysis.exports.length > 0) {
      const defaultExport = analysis.exports.find(e => e.isDefault);
      const namedExports = analysis.exports.filter(e => !e.isDefault);

      let importStatement = '';
      if (defaultExport && namedExports.length > 0) {
        importStatement = `import ${defaultExport.name}, { ${namedExports.map(e => e.name).join(', ')} } from `;
      } else if (defaultExport) {
        importStatement = `import ${defaultExport.name} from `;
      } else if (namedExports.length > 0) {
        importStatement = `import { ${namedExports.map(e => e.name).join(', ')} } from `;
      }

      if (importStatement) {
        importStatement += `'${this.getRelativePath(analysis.filePath)}';`;
        imports.push(importStatement);
      }
    }

    // 根据框架添加测试工具导入
    if (this.options.framework === 'jest' && analysis.isReactComponent) {
      imports.push("import { render, screen } from '@testing-library/react';");
      imports.push("import userEvent from '@testing-library/user-event';");
    } else if (this.options.framework === 'vitest' && analysis.isReactComponent) {
      imports.push("import { render, screen } from '@testing-library/react';");
      imports.push("import userEvent from '@testing-library/user-event';");
    }

    return imports;
  }

  generateReactComponentTests(analysis, framework) {
    let tests = '';

    analysis.components.forEach(component => {
      // Describe块
      tests += `describe('${component.name}', () => {\n`;

      // 基本渲染测试
      tests += `  it('renders without crashing', () => {\n`;
      tests += `    render(<${component.name} />);\n`;

      if (framework === 'jest') {
        tests += `    expect(screen.getByTestId('${component.name.toLowerCase()}-container')).toBeInTheDocument();\n`;
      }
      tests += `  });\n\n`;

      // Props测试
      tests += `  it('renders with props correctly', () => {\n`;
      tests += `    const testProps = {\n`;
      tests += `      // Add test props here\n`;
      tests += `      title: 'Test Title',\n`;
      tests += `      onClick: jest.fn()\n`;
      tests += `    };\n`;
      tests += `    render(<${component.name} {...testProps} />);\n`;
      tests += `    // Add assertions here\n`;
      tests += `  });\n\n`;

      // 交互测试
      tests += `  it('handles user interactions', async () => {\n`;
      tests += `    const mockFn = jest.fn();\n`;
      tests += `    render(<${component.name} onClick={mockFn} />);\n`;
      tests += `    \n`;
      tests += `    const interactiveElement = screen.getByRole('button');\n`;
      tests += `    await userEvent.click(interactiveElement);\n`;
      tests += `    \n`;
      tests += `    expect(mockFn).toHaveBeenCalled();\n`;
      tests += `  });\n`;

      tests += `});\n\n`;
    });

    return tests;
  }

  generateVueComponentTests(analysis, framework) {
    let tests = '';

    tests += `describe('${path.basename(analysis.filePath, path.extname(analysis.filePath))}', () => {\n`;
    tests += `  it('renders without crashing', () => {\n`;
    tests += `    const wrapper = mount(${path.basename(analysis.filePath, path.extname(analysis.filePath))});\n`;
    tests += `    expect(wrapper.exists()).toBe(true);\n`;
    tests += `  });\n\n`;

    tests += `  it('renders with props correctly', () => {\n`;
    tests += `    const props = {\n`;
    tests += `      // Add test props here\n`;
    tests += `      title: 'Test Title'\n`;
    tests += `    };\n`;
    tests += `    const wrapper = mount(${path.basename(analysis.filePath, path.extname(analysis.filePath))}, { props });\n`;
    tests += `    expect(wrapper.props()).toEqual(props);\n`;
    tests += `  });\n\n`;

    tests += `});\n\n`;

    return tests;
  }

  generateJSTests(analysis, framework) {
    let tests = '';

    // 测试导出的函数
    analysis.exports.forEach(exp => {
      tests += `describe('${exp.name}', () => {\n`;

      // 基本功能测试
      tests += `  it('should be defined', () => {\n`;
      tests += `    expect(${exp.name}).toBeDefined();\n`;
      tests += `  });\n\n`;

      // 正常情况测试
      tests += `  it('should handle valid input', () => {\n`;
      tests += `    const result = ${exp.name}(/* test input here */);\n`;
      tests += `    expect(result).toBe(/* expected output here */);\n`;
      tests += `  });\n\n`;

      // 边界情况测试
      tests += `  it('should handle edge cases', () => {\n`;
      tests += `    // Test with null, undefined, empty values\n`;
      tests += `    expect(() => ${exp.name}(null)).not.toThrow();\n`;
      tests += `    expect(() => ${exp.name}(undefined)).not.toThrow();\n`;
      tests += `  });\n\n`;

      // 错误处理测试
      tests += `  it('should handle errors gracefully', () => {\n`;
      tests += `    expect(() => ${exp.name}(/* invalid input */)).not.toThrow();\n`;
      tests += `  });\n\n`;

      tests += `});\n\n`;
    });

    return tests;
  }

  generateTestPath(originalPath) {
    const ext = path.extname(originalPath);
    const nameWithoutExt = path.basename(originalPath, ext);
    const dir = path.dirname(originalPath);

    // 根据项目结构确定测试文件位置
    const testStructure = this.detectTestStructure();

    let testDir;
    if (testStructure.found.some(f => f.pattern === 'src/__tests__/')) {
      testDir = path.join(this.projectPath, 'src', '__tests__');
    } else if (testStructure.found.some(f => f.pattern === 'test/')) {
      testDir = path.join(this.projectPath, 'test');
    } else if (testStructure.found.some(f => f.pattern === 'tests/')) {
      testDir = path.join(this.projectPath, 'tests');
    } else {
      // 默认在同一目录下
      testDir = path.join(this.projectPath, dir);
    }

    return path.join(testDir, `${nameWithoutExt}.test${ext}`);
  }

  detectTestStructure() {
    const projectPath = this.projectPath;
    const testDirs = [
      path.join(projectPath, 'test'),
      path.join(projectPath, 'tests'),
      path.join(projectPath, 'src', '__tests__')
    ];

    const found = testDirs.filter(dir => fs.existsSync(dir)).map(dir => ({
      pattern: path.relative(projectPath, dir) + '/',
      type: 'directory'
    }));

    return { found };
  }

  getRelativePath(filePath) {
    return path.relative(path.dirname(filePath), filePath);
  }
}

module.exports = TestGenerator;

// CLI用法
if (require.main === module) {
  const filePath = process.argv[2];
  const options = process.argv[3] ? JSON.parse(process.argv[3]) : {};
  const projectPath = process.argv[4] || process.cwd();

  if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
  }

  const generator = new TestGenerator(projectPath, options);

  try {
    const result = generator.generateForFile(filePath);
    console.log('Test file path:', result.testPath);
    console.log('Test content:');
    console.log('---');
    console.log(result.testContent);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}