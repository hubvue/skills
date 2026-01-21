# 前端测试模式和最佳实践

## 测试类型

### 1. 单元测试 (Unit Tests)
测试单个函数、组件或模块的功能。

**适用场景**：
- 纯函数逻辑验证
- 组件渲染测试
- 工具函数测试

**示例**：
```javascript
describe('formatCurrency', () => {
  it('formats number with currency symbol', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('handles zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

### 2. 集成测试 (Integration Tests)
测试多个模块或组件协同工作的情况。

**适用场景**：
- API调用与数据处理
- 组件间交互
- 状态管理测试

**示例**：
```javascript
describe('UserForm Integration', () => {
  it('submits form data correctly', async () => {
    const mockSubmit = jest.fn();
    render(<UserForm onSubmit={mockSubmit} />);

    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(mockSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
  });
});
```

### 3. 端到端测试 (E2E Tests)
模拟用户完整操作流程。

**适用场景**：
- 关键用户流程
- 跨页面交互
- 完整业务场景

## 组件测试模式

### React组件测试

#### 1. 基本渲染测试
```javascript
describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

#### 2. Props测试
```javascript
it('applies variant classes correctly', () => {
  render(<Button variant="primary">Button</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});
```

#### 3. 事件测试
```javascript
it('handles click events', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 4. 条件渲染测试
```javascript
it('shows loading state', () => {
  render(<Button isLoading>Loading</Button>);
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeDisabled();
});
```

### Vue组件测试

#### 1. 基本挂载测试
```javascript
describe('Button Component', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
```

#### 2. Props测试
```javascript
it('applies variant correctly', () => {
  const wrapper = mount(Button, {
    props: { variant: 'primary' },
    slots: { default: 'Button' }
  });
  expect(wrapper.classes()).toContain('btn-primary');
});
```

#### 3. 事件测试
```javascript
it('emits click event', async () => {
  const wrapper = mount(Button, {
    slots: { default: 'Click me' }
  });

  await wrapper.trigger('click');
  expect(wrapper.emitted('click')).toBeTruthy();
});
```

## 函数测试模式

### 1. 纯函数测试
```javascript
describe('calculatePrice', () => {
  it('calculates with tax', () => {
    expect(calculatePrice(100, 0.1)).toBe(110);
  });

  it('handles edge cases', () => {
    expect(calculatePrice(0, 0.1)).toBe(0);
    expect(calculatePrice(100, 0)).toBe(100);
  });
});
```

### 2. 异步函数测试
```javascript
describe('fetchUserData', () => {
  it('fetches user data successfully', async () => {
    const mockUser = { id: 1, name: 'John' };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUser)
    });

    const user = await fetchUserData(1);
    expect(user).toEqual(mockUser);
  });

  it('handles API errors', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));

    await expect(fetchUserData(1)).rejects.toThrow('API Error');
  });
});
```

## Mock和Stub模式

### 1. API Mock
```javascript
// 完整API响应mock
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: [] })
});

// 错误响应mock
global.fetch = jest.fn().mockResolvedValue({
  ok: false,
  status: 404
});
```

### 2. 模块Mock
```javascript
// Mock整个模块
jest.mock('./api', () => ({
  fetchUsers: jest.fn().mockResolvedValue([])
}));

// 部分mock
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'),
  formatDate: jest.fn().mockReturnValue('01/01/2024')
}));
```

### 3. 时间Mock
```javascript
beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date('2024-01-01'));
});

afterEach(() => {
  jest.useRealTimers();
});
```

## 测试数据和边界条件

### 1. 测试数据生成
```javascript
const generateTestUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
});

it('handles user data correctly', () => {
  const user = generateTestUser({ name: 'Custom Name' });
  expect(displayUserName(user)).toBe('Custom Name');
});
```

### 2. 边界条件测试
```javascript
describe('Array Utils', () => {
  it('handles empty arrays', () => {
    expect(getFirstItem([])).toBeUndefined();
  });

  it('handles null/undefined', () => {
    expect(getFirstItem(null)).toBeUndefined();
    expect(getFirstItem(undefined)).toBeUndefined();
  });

  it('handles single item arrays', () => {
    expect(getFirstItem([42])).toBe(42);
  });
});
```

## 测试覆盖率目标

### 推荐的覆盖率阈值：
- **语句覆盖率**: 70-80%
- **分支覆盖率**: 70-80%
- **函数覆盖率**: 80-90%
- **行覆盖率**: 70-80%

### 覆盖率配置示例：
```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 70,
    functions: 80,
    lines: 70,
    statements: 70
  },
  // 核心业务逻辑要求更高
  './src/core/': {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90
  }
}
```

## 测试文件组织

### 1. 目录结构
```
src/
  components/
    Button/
      Button.jsx
      Button.test.jsx
    Form/
      Form.jsx
      Form.test.jsx
  utils/
    format.js
    format.test.js
  services/
    api.js
    api.test.js
```

### 2. 测试文件命名
- `Component.test.jsx` - 组件测试
- `function.test.js` - 函数测试
- `integration.test.js` - 集成测试
- `e2e.test.js` - 端到端测试

## 持续集成配置

### GitHub Actions示例
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## 性能测试

### 1. 渲染性能测试
```javascript
it('renders quickly', () => {
  const start = performance.now();
  render(<LargeComponent />);
  const end = performance.now();

  expect(end - start).toBeLessThan(100); // 100ms内完成
});
```

### 2. 内存泄漏测试
```javascript
it('does not leak memory', async () => {
  const { unmount } = render(<Component />);
  const initialMemory = process.memoryUsage().heapUsed;

  unmount();

  // 强制垃圾回收（需要Node.js参数）
  global.gc();
  const finalMemory = process.memoryUsage().heapUsed;

  expect(finalMemory - initialMemory).toBeLessThan(1024 * 1024); // 1MB
});
```