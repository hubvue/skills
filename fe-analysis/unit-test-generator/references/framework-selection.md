# 测试框架选择指南

## 主流测试框架对比

### Jest

**优势**：
- 零配置开箱即用
- 内置断言库和Mock功能
- 强大的快照测试
- 优秀的并行测试支持
- 丰富的生态系统

**适用场景**：
- React项目（Create React App默认）
- 需要快速上手的项目
- 大型项目（性能优秀）

**配置复杂度**：低

**学习曲线**：平缓

```javascript
// 安装
npm install --save-dev jest

// 简单测试
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
```

### Vitest

**优势**：
- 基于Vite的极速启动
- 原生TypeScript支持
- 与Vite生态完美集成
- JSDOM支持
- 兼容Jest API

**适用场景**：
- 使用Vite构建的项目
- TypeScript项目
- 需要快速热重载的开发

**配置复杂度**：低（如果已使用Vite）

**学习曲线**：平缓（与Jest类似）

```javascript
// 安装
npm install --save-dev vitest

// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true
  }
});
```

### Mocha

**优势**：
- 高度可定制
- 轻量级核心
- 灵活的断言库选择（Chai, Expect, Should）
- 丰富的报告器

**适用场景**：
- 需要高度定制的项目
- 已有Chai断言库的项目
- Node.js服务端项目

**配置复杂度**：中等

**学习曲线**：中等（需要配置断言库）

```javascript
// 安装
npm install --save-dev mocha chai

// 测试
const { expect } = require('chai');

describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    expect([1, 2, 3].indexOf(4)).to.equal(-1);
  });
});
```

## 前端框架特定测试工具

### React

#### Testing Library
```javascript
// 安装
npm install --save-dev @testing-library/react @testing-library/jest-dom

// 使用
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

#### Enzyme
```javascript
// 安装
npm install --save-dev enzyme enzyme-adapter-react-16

// 使用
import { shallow } from 'enzyme';

test('renders without crashing', () => {
  shallow(<App />);
});
```

### Vue

#### Vue Test Utils
```javascript
// 安装
npm install --save-dev @vue/test-utils

// 使用
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

test('renders a message', () => {
  const wrapper = mount(MyComponent, {
    props: {
      msg: 'Hello world'
    }
  });

  expect(wrapper.text()).toMatch('Hello world');
});
```

### Angular

#### Jasmine + Karma（默认）
```javascript
// Angular CLI自动配置

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

## 选择决策矩阵

### 项目特征分析

| 特征 | Jest | Vitest | Mocha |
|------|------|--------|-------|
| 项目规模 | 中到大型 | 任何规模 | 任何规模 |
| 构建工具 | 任何 | Vite优先 | 任何 |
| TypeScript | 需要配置 | 原生支持 | 需要配置 |
| 学习成本 | 低 | 低 | 中等 |
| 配置复杂度 | 低 | 低 | 中等 |
| 执行速度 | 快 | 最快 | 中等 |
| 社区生态 | 最丰富 | 快速增长 | 成熟 |
| React集成 | 最佳 | 优秀 | 良好 |
| Vue集成 | 良好 | 优秀 | 良好 |
| Node.js集成 | 良好 | 良好 | 最佳 |

### 快速选择指南

#### 选择Jest如果：
- 你的项目使用Create React App
- 需要零配置快速开始
- 团队测试经验较少
- 需要强大的Mock功能

#### 选择Vitest如果：
- 你的项目使用Vite
- 主要是TypeScript项目
- 需要最快的测试反馈
- 追求现代化的开发体验

#### 选择Mocha如果：
- 需要高度定制化
- 已有Chai断言库经验
- 主要是Node.js项目
- 团队有丰富的测试经验

## 迁移指南

### 从Jest迁移到Vitest

1. **安装依赖**
```bash
npm install --save-dev vitest @vitest/ui
```

2. **更新配置**
```javascript
// vite.config.js
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
```

3. **更新package.json脚本**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 从Mocha迁移到Jest

1. **安装依赖**
```bash
npm install --save-dev jest @types/jest
```

2. **转换断言**
```javascript
// Mocha + Chai
expect(value).to.be.true;

// Jest
expect(value).toBe(true);
```

3. **Mock语法转换**
```javascript
// Mocha + Sinon
const stub = sinon.stub(api, 'fetch');

// Jest
jest.spyOn(api, 'fetch').mockReturnValue();
```

## 推荐的组合

### React项目（推荐度：★★★★★）
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^5.0.0",
    "@testing-library/user-event": "^14.0.0"
  }
}
```

### Vue项目（推荐度：★★★★★）
```json
{
  "devDependencies": {
    "vitest": "^0.34.0",
    "@vue/test-utils": "^2.0.0",
    "jsdom": "^22.0.0"
  }
}
```

### Node.js项目（推荐度：★★★★☆）
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.0.0"
  }
}
```

### TypeScript项目（推荐度：★★★★★）
```json
{
  "devDependencies": {
    "vitest": "^0.34.0",
    "@vitest/ui": "^0.34.0",
    "jsdom": "^22.0.0"
  }
}
```

## 性能对比

### 启动时间（冷启动）
- Jest: 2-3秒
- Vitest: 0.5-1秒（得益于Vite）
- Mocha: 1-2秒

### 测试执行速度
- Vitest: 最快（并行+Vite优化）
- Jest: 快（并行执行）
- Mocha: 中等（取决于配置）

### 内存使用
- Jest: 较高（JSDOM实例）
- Vitest: 中等（可选的内存优化）
- Mocha: 较低（轻量级核心）

## 最佳实践建议

1. **新项目优先考虑Vitest**，特别是使用Vite构建的项目
2. **React项目推荐Jest + Testing Library**，生态成熟
3. **大型企业项目可以考虑Jest**，稳定性和支持更好
4. **Node.js服务端项目Jest或Mocha都可以**，根据团队偏好选择
5. **学习型项目建议Jest**，文档和社区资源丰富