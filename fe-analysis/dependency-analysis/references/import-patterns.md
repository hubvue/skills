# Import Pattern Detection

This reference contains patterns for detecting various import statements in JavaScript, TypeScript, and other file types.

## JavaScript/TypeScript Imports

### ES6 Imports
```javascript
// Default import
import name from 'module';

// Named imports
import { name1, name2 } from 'module';

// Namespace import
import * as name from 'module';

// Default + named imports
import name, { name1, name2 } from 'module';

// Dynamic imports
const module = await import('module');

// Re-exports
export { name1, name2 } from 'module';
export * from 'module';
export { default as name } from 'module';
```

### CommonJS
```javascript
// Require
const module = require('module');

// Destructured require
const { name1, name2 } = require('module');

// Dynamic require
const module = require('module');

// require.resolve
const path = require.resolve('module');

// require.cache
delete require.cache[require.resolve('module')];
```

### Detection Regex Patterns
```javascript
const IMPORT_PATTERNS = {
  // ES6 imports
  es6Import: /import\s+(?:[\w*{}\s,]+from\s+)?['"`]([^'"`]+)['"`]/g,
  es6ExportFrom: /export\s+(?:[\w*{}\s,]+\s+from\s+)?['"`]([^'"`]+)['"`]/g,

  // Dynamic imports
  dynamicImport: /import\s*\(\s*['"`]([^'"`]+)['"`]/g,

  // CommonJS
  commonjsRequire: /require\s*\(\s*['"`]([^'"`]+)['"`]/g,
  requireResolve: /require\.resolve\s*\(\s*['"`]([^'"`]+)['"`]/g,

  // Conditional requires
  conditionalRequire: /if\s*\([^)]*\)\s*{[^}]*require\s*\(\s*['"`]([^'"`]+)['"`][^}]*}/g
};
```

## TypeScript Specific Patterns

### Path Mapping
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

### Type-Only Imports
```typescript
import type { Type } from 'module';
import type Type from 'module';
```

### Triple-Slash Directives
```typescript
/// <reference types="module" />
/// <reference path="./types" />
```

## CSS/SCSS Imports

### CSS @import
```css
@import 'module';
@import url('module');
@import "module";
```

### SCSS @import and @use
```scss
// SCSS imports
@import 'module';
@use 'module' as alias;
@forward 'module';

// Partials
@import 'module/file';
```

### Detection Patterns
```javascript
const CSS_IMPORT_PATTERNS = {
  cssImport: /@import\s+(?:url\s*\(\s*)?['"`]([^'"`]+)['"`]/g,
  scssUse: /@use\s+['"`]([^'"`]+)['"`](?:\s+as\s+(\w+))?/g,
  scssForward: /@forward\s+['"`]([^'"`]+)['"`]/g
};
```

## Framework-Specific Patterns

### Vue.js
```javascript
// Dynamic imports in Vue
const Component = () => import('./Component.vue');

// Async components
Vue.component('async-component', () => import('./AsyncComponent.vue'));
```

### React
```javascript
// Lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Code splitting
import('./module').then(module => {
  // Use module
});
```

### Next.js
```javascript
// Dynamic imports
const dynamicComponent = dynamic(() => import('../components/hello'));

// SSR-safe dynamic imports
const DynamicComponent = dynamic(
  () => import('../components/hello').then(mod => mod.Hello),
  { ssr: false }
);
```

## Asset Imports

### Common Asset Extensions
```javascript
const ASSET_EXTENSIONS = [
  // Images
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
  // Fonts
  '.woff', '.woff2', '.eot', '.ttf', '.otf',
  // Media
  '.mp4', '.webm', '.ogg', '.mp3', '.wav', '.flac',
  // Data
  '.json', '.xml', '.csv', '.yaml', '.yml',
  // Styles
  '.css', '.scss', '.sass', '.less', '.styl', '.stylus'
];
```

### Asset Import Patterns
```javascript
// Direct imports
import imageUrl from './image.png';
import './styles.css';

// Dynamic asset imports
const imageUrl = require(`./images/${imageName}.png`);
const styleSheet = require(`./themes/${theme}.css`);
```

## Aliases and Path Resolution

### Common Aliases
```javascript
const COMMON_ALIASES = {
  '@': 'src',
  '@src': 'src',
  '@components': 'src/components',
  '@utils': 'src/utils',
  '@assets': 'src/assets',
  '@styles': 'src/styles',
  '@config': 'src/config',
  '@api': 'src/api',
  '@store': 'src/store',
  '@hooks': 'src/hooks',
  '@types': 'src/types'
};
```

### Webpack Aliases
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
};
```

### Vite Aliases
```javascript
// vite.config.js
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
};
```

## Advanced Import Patterns

### Conditional Imports
```javascript
// Platform-specific imports
const platformModule = process.platform === 'win32'
  ? require('./windows-module')
  : require('./unix-module');

// Feature detection
if (typeof window !== 'undefined') {
  const browserModule = require('./browser-module');
}

// Environment-specific
if (process.env.NODE_ENV === 'development') {
  const devTools = require('./dev-tools');
}
```

### Plugin and Loader Imports
```javascript
// Webpack loaders
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}

// Babel plugins
module.exports = {
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties'
  ]
}
```

### Template Literals
```javascript
// Dynamic imports with template literals
const modulePath = `./modules/${moduleName}`;
const mod = require(modulePath);

// Language-specific imports
const locale = require(`./locales/${language}.json`);
```

## Import Analysis Utilities

### Extracting All Imports
```javascript
function extractAllImports(content) {
  const imports = new Map();

  // Apply all patterns
  for (const [patternType, pattern] of Object.entries(IMPORT_PATTERNS)) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const moduleName = match[1];

      if (!imports.has(moduleName)) {
        imports.set(moduleName, {
          types: new Set(),
          locations: []
        });
      }

      imports.get(moduleName).types.add(patternType);
      imports.get(moduleName).locations.push({
        line: getLineNumber(content, match.index),
        column: match.index,
        type: patternType
      });
    }
  }

  return imports;
}

function getLineNumber(content, index) {
  const beforeMatch = content.substring(0, index);
  return beforeMatch.split('\n').length;
}
```

### Categorizing Imports
```javascript
function categorizeImport(importName) {
  // Node.js built-in modules
  if (BUILTIN_MODULES.includes(importName)) {
    return 'builtin';
  }

  // Relative imports
  if (importName.startsWith('./') || importName.startsWith('../')) {
    return 'relative';
  }

  // Absolute imports
  if (importName.startsWith('/')) {
    return 'absolute';
  }

  // External packages
  if (isExternalPackage(importName)) {
    return 'external';
  }

  // Aliases
  if (isAlias(importName)) {
    return 'alias';
  }

  return 'unknown';
}

function isExternalPackage(importName) {
  // Check if it looks like an npm package
  return /^[a-z0-9@][a-z0-9\-._]*\/[a-z0-9@][a-z0-9\-._]*/.test(importName) ||
         /^[a-z0-9@][a-z0-9\-._]*/.test(importName);
}
```

### Resolving Aliases
```javascript
function resolveAlias(importName, aliases, baseUrl) {
  // Check for exact alias match
  if (aliases[importName]) {
    return path.resolve(baseUrl, aliases[importName]);
  }

  // Check for pattern aliases (e.g., @components/*)
  for (const [alias, target] of Object.entries(aliases)) {
    if (alias.endsWith('*')) {
      const prefix = alias.slice(0, -1);
      if (importName.startsWith(prefix)) {
        const suffix = importName.slice(prefix.length);
        return path.resolve(baseUrl, target.slice(0, -1) + suffix);
      }
    }
  }

  return importName;
}
```

## Error Handling

### Import Validation
```javascript
function validateImport(importName, filePath) {
  const errors = [];

  // Check for empty imports
  if (!importName || importName.trim() === '') {
    errors.push('Empty import name');
  }

  // Check for invalid characters
  if (/[<>:"|?*]/.test(importName)) {
    errors.push('Invalid characters in import name');
  }

  // Check for very long imports
  if (importName.length > 200) {
    errors.push('Import name too long');
  }

  // Check for suspicious patterns
  if (importName.includes('../..')) {
    errors.push('Potentially problematic relative path');
  }

  return errors;
}
```