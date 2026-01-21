---
name: unit-test-generator
description: Intelligent unit test generator for frontend projects that detects existing test frameworks and generates comprehensive tests for functions, components, and modules. Use when you need to: (1) Add unit tests to existing codebases, (2) Set up testing infrastructure for new projects, (3) Generate test cases for specific functions or components, (4) Ensure architectural consistency in testing approach across projects. Supports Jest, Vitest, Mocha with React, Vue, Angular frameworks.
---

# Frontend Unit Test Generator

An intelligent assistant for creating and managing unit tests in frontend projects. This skill automatically detects your project's testing setup and generates appropriate, framework-consistent test code.

## Quick Start

### Installation
```bash
npm install
```

### Basic Usage
Generate tests for any file or component:

```bash
node scripts/detect-test-framework.js /path/to/project
node scripts/generate-test.js src/components/Button.js
```

## Core Capabilities

### Framework Detection
Automatically identifies your project's testing stack:
- **Test Frameworks**: Jest, Vitest, Mocha, Jasmine
- **Assertion Libraries**: Expect, Chai, Should
- **Testing Tools**: Testing Library, Sinon, Cypress
- **Configuration Files**: jest.config.js, vitest.config.ts, mocha.opts
- **Test Structure**: __tests__/, test/, tests/, *.test.js patterns

### Smart Test Generation
- **Component Tests**: React, Vue, Angular with Testing Library
- **Function Tests**: Pure functions, async functions, API calls
- **Mock Generation**: API mocks, module mocks, time mocks
- **Edge Cases**: Null/undefined handling, error scenarios
- **Coverage Analysis**: Identifies untested code paths

### Framework Consistency
Maintains your project's existing testing patterns:
- Same assertion style (expect vs assert)
- Consistent file organization
- Compatible test descriptions
- Proper mock patterns

## Usage Examples

### 1. Detect Project Testing Setup

```javascript
const TestFrameworkDetector = require('./scripts/detect-test-framework');

const detector = new TestFrameworkDetector('./my-project');
const analysis = detector.detect();

console.log(analysis);
// Output: Frameworks, utilities, config files, recommendations
```

### 2. Generate Test for Component

```javascript
const TestGenerator = require('./scripts/generate-test');

const generator = new TestGenerator('./my-project', {
  framework: 'jest',
  react: true
});

const result = generator.generateForFile('src/components/Button.jsx');
// Returns: { testPath, testContent, analysis }
```

### 3. Setup Testing for New Project

```javascript
const TestConfigGenerator = require('./scripts/setup-test-config');

const config = new TestConfigGenerator('./my-project', 'jest', {
  react: true,
  typescript: true,
  coverage: true
});

const files = config.writeConfigs(); // Creates config files
const deps = config.getDependencies(); // Returns required packages
```

## Interactive Test Creation

### For Existing Projects

1. **Analyze Project**: Run framework detection first
2. **Select File**: Choose file/component to test
3. **Generate Tests**: Auto-generate consistent test code
4. **Review & Customize**: Add specific test cases
5. **Run Tests**: Verify tests pass

### For New Projects

1. **Framework Selection**: Choose based on project needs
   - See [framework-selection.md](references/framework-selection.md)
2. **Setup Configuration**: Generate config files
3. **Install Dependencies**: Add required packages
4. **Create First Tests**: Start with critical components

## Generated Test Patterns

### React Component Tests
```javascript
describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Vue Component Tests
```javascript
describe('Button', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Button);
    expect(wrapper.exists()).toBe(true);
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

### Function Tests
```javascript
describe('formatCurrency', () => {
  it('formats numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('handles edge cases', () => {
    expect(formatCurrency(null)).toBe('$0.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

## Configuration Options

### TestGenerator Options
```javascript
{
  framework: 'jest' | 'vitest' | 'mocha',  // Test framework
  assertionStyle: 'expect' | 'assert',     // Assertion style
  includeMocks: true,                      // Include mock generation
  testType: 'unit' | 'integration' | 'e2e', // Test type
  coverage: true,                          // Include coverage
  environment: 'jsdom' | 'node'            // Test environment
}
```

## Best Practices

### Test Organization
- **Co-location**: Keep tests near source files
- **Naming**: Use `.test.js` or `.spec.js` suffix
- **Structure**: Group related tests in `describe` blocks
- **Documentation**: Add meaningful test descriptions

### Test Quality
- **AAA Pattern**: Arrange, Act, Assert
- **Single Responsibility**: One assertion per test
- **Descriptive Names**: What behavior is being tested
- **Edge Cases**: Test null, undefined, errors

## Integration Examples

### Create React App
```bash
# Already has Jest configured
node scripts/generate-test.js src/components/Button.jsx
```

### Vite + Vue
```bash
# Setup Vitest
node scripts/setup-test-config.js vitest '{"vue": true}'
# Generate tests
node scripts/generate-test.js src/components/Button.vue
```

### Existing Mocha Project
```bash
# Detect setup
node scripts/detect-test-framework.js .
# Add new tests
node scripts/generate-test.js src/utils/format.js '{"framework": "mocha"}'
```

## Resources

### scripts/
Executable Node.js scripts for test generation and configuration:
- `detect-test-framework.js` - Analyzes existing testing setup
- `generate-test.js` - Creates test files from source code
- `setup-test-config.js` - Generates testing configuration files

### references/
Comprehensive documentation and guides:
- [test-patterns.md](references/test-patterns.md) - Testing patterns and best practices
- [framework-selection.md](references/framework-selection.md) - Framework comparison and selection guide

### assets/
Template files for common testing scenarios:
- [react-component.template.test.jsx](assets/react-component.template.test.jsx) - React component test template
- [vue-component.template.test.js](assets/vue-component.template.test.js) - Vue component test template
