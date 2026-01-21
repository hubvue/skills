# Deep Dependency Analysis Patterns

This reference contains patterns and strategies for analyzing deep dependencies in node_modules trees.

## Dependency Tree Traversal

### Breadth-First Traversal
Useful for finding all packages at a specific depth:
```javascript
async function traverseBreadthFirst(rootPackage, maxDepth = 10) {
  const visited = new Set();
  const queue = [{ pkg: rootPackage, depth: 0 }];
  const result = [];

  while (queue.length > 0) {
    const { pkg, depth } = queue.shift();

    if (depth > maxDepth) continue;
    if (visited.has(pkg.name + '@' + pkg.version)) continue;

    visited.add(pkg.name + '@' + pkg.version);
    result.push({ ...pkg, depth });

    for (const dep of pkg.dependencies || []) {
      queue.push({ pkg: dep, depth: depth + 1 });
    }
  }

  return result;
}
```

### Depth-First Traversal
Useful for finding dependency chains:
```javascript
async function traverseDepthFirst(rootPackage, path = [], visited = new Set()) {
  const key = rootPackage.name + '@' + rootPackage.version;

  if (visited.has(key)) {
    return { circular: true, path: [...path, rootPackage.name] };
  }

  visited.add(key);
  const currentPath = [...path, rootPackage.name];
  const results = [currentPath];

  for (const dep of rootPackage.dependencies || []) {
    const result = await traverseDepthFirst(dep, currentPath, visited);
    if (result.circular) {
      results.push(`Circular: ${result.path.join(' -> ')}`);
    } else {
      results.push(...result);
    }
  }

  visited.delete(key);
  return results;
}
```

## Package.json Analysis

### Reading Nested Package.json
```javascript
async function readPackageJson(packagePath) {
  const packageJsonPath = path.join(packagePath, 'package.json');

  try {
    const content = await fs.readFile(packageJsonPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}
```

### Resolving Module Paths
```javascript
function resolveModulePath(basePath, moduleName) {
  // Handle scoped packages
  if (moduleName.startsWith('@')) {
    const [scope, name] = moduleName.split('/');
    return path.join(basePath, 'node_modules', scope, name);
  }

  return path.join(basePath, 'node_modules', moduleName);
}
```

## Dependency Types Detection

### Production vs Development
```javascript
function categorizeDependency(packageName, context) {
  // Test-related packages
  if (packageName.includes('test') ||
      packageName.includes('spec') ||
      packageName.includes('jest') ||
      packageName.includes('mocha') ||
      packageName.includes('cypress')) {
    return 'dev';
  }

  // Build tools
  if (packageName.includes('webpack') ||
      packageName.includes('rollup') ||
      packageName.includes('vite') ||
      packageName.includes('babel') ||
      packageName.includes('typescript')) {
    return 'dev';
  }

  // Linting and formatting
  if (packageName.includes('eslint') ||
      packageName.includes('prettier') ||
      packageName.includes('stylelint')) {
    return 'dev';
  }

  // Default to production
  return 'prod';
}
```

## Circular Dependency Detection

### Package-Level Circular Dependencies
```javascript
function detectPackageCycles(dependencyGraph) {
  const cycles = [];
  const visiting = new Set();
  const visited = new Set();

  function dfs(packageName, path) {
    if (visiting.has(packageName)) {
      const cycleStart = path.indexOf(packageName);
      cycles.push(path.slice(cycleStart));
      return;
    }

    if (visited.has(packageName)) return;

    visiting.add(packageName);
    const deps = dependencyGraph.get(packageName) || [];

    for (const dep of deps) {
      dfs(dep, [...path, packageName]);
    }

    visiting.delete(packageName);
    visited.add(packageName);
  }

  for (const pkg of dependencyGraph.keys()) {
    if (!visited.has(pkg)) {
      dfs(pkg, []);
    }
  }

  return cycles;
}
```

## Version Conflict Detection

### Semantic Version Ranges
```javascript
function detectVersionConflicts(dependencies) {
  const versions = new Map();
  const conflicts = [];

  for (const [name, version] of dependencies) {
    if (!versions.has(name)) {
      versions.set(name, []);
    }
    versions.get(name).push(version);
  }

  for (const [name, versionList] of versions) {
    if (versionList.length > 1) {
      // Check if versions are compatible
      const ranges = versionList.map(v => new semver.Range(v));
      const compatible = ranges.every(r1 =>
        ranges.every(r2 => semver.intersects(r1, r2))
      );

      if (!compatible) {
        conflicts.push({
          name,
          versions: versionList,
          severity: assessConflictSeverity(versionList)
        });
      }
    }
  }

  return conflicts;
}

function assessConflictSeverity(versions) {
  // Different major versions are high severity
  const majors = new Set(versions.map(v => semver.major(semver.minVersion(v))));
  if (majors.size > 1) return 'high';

  // Different minor versions are medium severity
  const minors = new Set(versions.map(v => semver.minor(semver.minVersion(v))));
  if (minors.size > 1) return 'medium';

  return 'low';
}
```

## License Analysis

### License Detection
```javascript
const LICENSE_PATTERNS = {
  'MIT': /MIT/i,
  'Apache-2.0': /Apache[- ]2\.0/i,
  'GPL-3.0': /GPL[- ]3\.0/i,
  'BSD-2-Clause': /BSD[- ]2[- ]Clause/i,
  'BSD-3-Clause': /BSD[- ]3[- ]Clause/i,
  'ISC': /ISC/i,
  'LGPL': /LGPL/i,
  'Unlicense': /Unlicense/i
};

function extractLicense(packageJson) {
  // Check explicit license field
  if (packageJson.license) {
    for (const [license, pattern] of Object.entries(LICENSE_PATTERNS)) {
      if (pattern.test(packageJson.license)) {
        return license;
      }
    }
  }

  // Check license file
  try {
    const licenseFile = fs.readFileSync('LICENSE', 'utf-8');
    for (const [license, pattern] of Object.entries(LICENSE_PATTERNS)) {
      if (pattern.test(licenseFile)) {
        return license;
      }
    }
  } catch (error) {
    // No license file
  }

  // Check README
  try {
    const readme = fs.readFileSync('README.md', 'utf-8');
    for (const [license, pattern] of Object.entries(LICENSE_PATTERNS)) {
      if (pattern.test(readme)) {
        return license;
      }
    }
  } catch (error) {
    // No README
  }

  return 'Unknown';
}
```

## Bundle Size Analysis

### Estimating Package Sizes
```javascript
async function getPackageSize(packagePath) {
  try {
    const { size } = await fs.stat(packagePath);
    let totalSize = size;

    // Recursively calculate size of all files
    const items = await fs.readdir(packagePath, { withFileTypes: true });

    for (const item of items) {
      if (item.name === 'node_modules') continue; // Avoid infinite recursion

      const itemPath = path.join(packagePath, item.name);
      if (item.isDirectory()) {
        totalSize += await getPackageSize(itemPath);
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

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
```

## Performance Optimizations

### Memoization
```javascript
const memoize = (fn) => {
  const cache = new Map();

  return async (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

const memoizedReadPackageJson = memoize(readPackageJson);
const memoizedGetPackageSize = memoize(getPackageSize);
```

### Parallel Processing
```javascript
async function analyzePackagesParallel(packagePaths, concurrency = 10) {
  const results = [];

  for (let i = 0; i < packagePaths.length; i += concurrency) {
    const batch = packagePaths.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(async (pkgPath) => {
        const packageJson = await memoizedReadPackageJson(pkgPath);
        const size = await memoizedGetPackageSize(pkgPath);
        const license = extractLicense(packageJson);

        return { path: pkgPath, packageJson, size, license };
      })
    );

    results.push(...batchResults);
  }

  return results;
}
```