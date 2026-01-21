# Peer Dependency Analysis

This reference contains patterns and strategies for analyzing peer dependencies in npm/yarn packages.

## Understanding Peer Dependencies

### What are Peer Dependencies?
Peer dependencies are dependencies that your package expects the host project to provide, rather than bundling them itself. They are commonly used in:
- Plugin systems (e.g., Babel plugins, ESLint plugins)
- Framework libraries (e.g., React components)
- Build tool integrations (e.g., Webpack loaders)

### Key Concepts
```json
// package.json example
{
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0"
  },
  "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    }
  }
}
```

## Detection Patterns

### Identifying Peer Dependencies
```javascript
async function analyzePeerDependencies(packageJson) {
  const peerDeps = packageJson.peerDependencies || {};
  const peerDepsMeta = packageJson.peerDependenciesMeta || {};
  const peerDepsExtra = packageJson.peerDependenciesExtra || {};

  const analysis = {
    required: {},
    optional: {},
    missing: [],
    conflicts: [],
    warnings: []
  };

  // Analyze each peer dependency
  for (const [name, version] of Object.entries(peerDeps)) {
    const meta = peerDepsMeta[name] || {};
    const isOptional = meta.optional === true;

    const dependency = {
      name,
      version,
      isOptional,
      isInstalled: false,
      installedVersion: null,
      isCompatible: false
    };

    // Check if installed
    const installed = await checkInstalledDependency(name);
    if (installed) {
      dependency.isInstalled = true;
      dependency.installedVersion = installed.version;
      dependency.isCompatible = checkVersionCompatibility(version, installed.version);
    } else {
      if (!isOptional) {
        analysis.missing.push(dependency);
      }
    }

    if (isOptional) {
      analysis.optional[name] = dependency;
    } else {
      analysis.required[name] = dependency;
    }
  }

  return analysis;
}
```

### Version Compatibility Checking
```javascript
function checkVersionCompatibility(requiredRange, installedVersion) {
  try {
    // Using semver to check compatibility
    const range = new semver.Range(requiredRange);
    return semver.satisfies(installedVersion, range);
  } catch (error) {
    // Fallback to basic comparison
    return isVersionCompatible(requiredRange, installedVersion);
  }
}

function isVersionCompatible(required, installed) {
  // Handle complex ranges like ^16.8.0 || ^17.0.0 || ^18.0.0
  const ranges = required.split('||').map(r => r.trim());

  return ranges.some(range => {
    // Remove operators and compare
    const cleanRequired = range.replace(/^[\^~<>=]/, '');
    const requiredMajor = parseInt(cleanRequired.split('.')[0]);
    const installedMajor = parseInt(installed.split('.')[0]);

    // Simple major version check
    if (range.startsWith('^')) {
      return requiredMajor === installedMajor;
    }

    if (range.startsWith('~')) {
      // Check major.minor
      const requiredMinor = parseInt(cleanRequired.split('.')[1]);
      const installedMinor = parseInt(installed.split('.')[1]);
      return requiredMajor === installedMajor && requiredMinor === installedMinor;
    }

    // Exact version or other operators
    try {
      return semver.satisfies(installed, range);
    } catch {
      return cleanRequired === installed;
    }
  });
}
```

## Conflict Detection

### Peer Dependency Conflicts
```javascript
async function detectPeerDependencyConflicts(dependencies) {
  const conflicts = [];
  const versionMap = new Map();

  // Collect all peer dependency requirements
  for (const dep of dependencies) {
    const peerAnalysis = await analyzePeerDependencies(dep.packageJson);

    for (const [name, requirement] of Object.entries(peerAnalysis.required)) {
      if (!versionMap.has(name)) {
        versionMap.set(name, []);
      }

      versionMap.get(name).push({
        package: dep.name,
        version: dep.version,
        required: requirement.version,
        isCompatible: requirement.isCompatible
      });
    }
  }

  // Check for conflicts
  for (const [name, requirements] of versionMap) {
    if (requirements.length > 1) {
      const conflict = analyzeVersionConflict(name, requirements);
      if (conflict) {
        conflicts.push(conflict);
      }
    }
  }

  return conflicts;
}

function analyzeVersionConflict(packageName, requirements) {
  const incompatible = requirements.filter(req => !req.isCompatible);

  if (incompatible.length > 0) {
    // Try to find a compatible version
    const compatibleVersion = findCompatibleVersion(
      requirements.map(req => req.required)
    );

    return {
      package: packageName,
      severity: 'high',
      requirements,
      incompatible,
      suggestion: compatibleVersion || 'Manual resolution required',
      affectedPackages: requirements.map(req => req.package)
    };
  }

  return null;
}

function findCompatibleVersion(versionRanges) {
  // Use semver.ranges to find intersection
  try {
    const ranges = versionRanges.map(range => new semver.Range(range));
    const intersecting = ranges.reduce((acc, range) => {
      if (!acc) return range;
      return semver.intersects(acc, range) ?
        new semver.Range(`${acc.raw} ${range.raw}`) : null;
    }, null);

    if (intersecting) {
      // Return a version that satisfies the intersection
      return semver.maxSatisfying(['99.0.0'], intersecting) || 'Intersection exists';
    }
  } catch (error) {
    // Fallback logic
  }

  return null;
}
```

## Installation Recommendations

### Generating Installation Commands
```javascript
function generateInstallCommands(peerAnalysis) {
  const commands = {
    install: [],
    update: [],
    warnings: []
  };

  // Missing required dependencies
  for (const missing of peerAnalysis.missing) {
    commands.install.push({
      package: missing.name,
      version: suggestCompatibleVersion(missing.version),
      reason: 'Missing peer dependency'
    });
  }

  // Version conflicts
  for (const conflict of peerAnalysis.conflicts) {
    if (conflict.suggestion && conflict.suggestion !== 'Manual resolution required') {
      commands.update.push({
        package: conflict.package,
        version: conflict.suggestion,
        reason: 'Peer dependency version conflict'
      });
    }
  }

  return commands;
}

function suggestCompatibleVersion(requiredRange) {
  // Extract major version from range
  const ranges = requiredRange.split('||').map(r => r.trim());

  // Prefer the latest compatible version
  for (const range of ranges.reverse()) {
    const match = range.match(/[\^~]?(\d+)\./);
    if (match) {
      return `^${match[1]}.0.0`;
    }
  }

  return 'latest';
}
```

## Common Peer Dependency Patterns

### React Ecosystem
```javascript
const REACT_PEER_PATTERNS = {
  // React components typically need react and react-dom
  component: {
    required: ['react', 'react-dom'],
    version: '^16.8.0 || ^17.0.0 || ^18.0.0'
  },

  // React Router
  router: {
    required: ['react', 'react-dom'],
    version: '>=16.8'
  },

  // Redux libraries
  redux: {
    required: ['react'],
    version: '^16.8.0 || ^17.0.0 || ^18.0.0'
  }
};
```

### Build Tools
```javascript
const BUILD_TOOL_PATTERNS = {
  // Webpack loaders
  webpackLoader: {
    required: ['webpack'],
    version: '^5.0.0'
  },

  // Babel plugins
  babelPlugin: {
    required: ['@babel/core'],
    version: '^7.0.0'
  },

  // ESLint plugins
  eslintPlugin: {
    required: ['eslint'],
    version: '>=7.0.0'
  }
};
```

### Framework Specific
```javascript
const FRAMEWORK_PATTERNS = {
  // Vue.js
  vue: {
    component: {
      required: ['vue'],
      version: '^3.0.0'
    }
  },

  // Angular
  angular: {
    library: {
      required: ['@angular/core'],
      version: '^12.0.0 || ^13.0.0 || ^14.0.0'
    }
  },

  // Svelte
  svelte: {
    component: {
      required: ['svelte'],
      version: '^3.0.0'
    }
  }
};
```

## Package Manager Differences

### npm vs yarn vs pnpm
```javascript
const PACKAGE_MANAGER_BEHAVIORS = {
  npm: {
    peerDependencyHandling: 'warn',
    autoInstall: false,
    command: 'npm install <package>'
  },

  yarn: {
    peerDependencyHandling: 'warn',
    autoInstall: true, // yarn 2+
    command: 'yarn add <package>'
  },

  pnpm: {
    peerDependencyHandling: 'strict',
    autoInstall: false,
    command: 'pnpm add <package>'
  }
};

function getPackageManagerBehavior(packageManager) {
  return PACKAGE_MANAGER_BEHAVIORS[packageManager] || PACKAGE_MANAGER_BEHAVIORS.npm;
}
```

## Reporting

### Peer Dependency Report Format
```javascript
function generatePeerDependencyReport(analysis) {
  const report = {
    summary: {
      totalRequired: Object.keys(analysis.required).length,
      totalOptional: Object.keys(analysis.optional).length,
      missing: analysis.missing.length,
      compatible: countCompatible(analysis.required),
      incompatible: countIncompatible(analysis.required)
    },
    required: analysis.required,
    optional: analysis.optional,
    missing: analysis.missing,
    recommendations: generateRecommendations(analysis),
    commands: generateInstallCommands(analysis)
  };

  return report;
}

function generateRecommendations(analysis) {
  const recommendations = [];

  // Missing dependencies
  if (analysis.missing.length > 0) {
    recommendations.push({
      priority: 'high',
      type: 'missing',
      message: `Install ${analysis.missing.length} missing peer dependencies`,
      dependencies: analysis.missing.map(m => m.name)
    });
  }

  // Version conflicts
  if (analysis.conflicts.length > 0) {
    recommendations.push({
      priority: 'medium',
      type: 'conflict',
      message: `Resolve ${analysis.conflicts.length} peer dependency conflicts`,
      conflicts: analysis.conflicts
    });
  }

  return recommendations;
}
```

## Integration with Dependency Analysis

### Combining with Regular Dependencies
```javascript
async function comprehensiveDependencyAnalysis(projectPath) {
  const packageJson = await readPackageJson(path.join(projectPath, 'package.json'));

  const analysis = {
    dependencies: await analyzeDependencies(packageJson),
    devDependencies: await analyzeDevDependencies(packageJson),
    peerDependencies: await analyzePeerDependencies(packageJson),
    transitivePeerDeps: await analyzeTransitivePeerDependencies(projectPath)
  };

  // Check for circular peer dependencies
  analysis.circularPeerDeps = detectCircularPeerDependencies(analysis);

  // Check for duplicate functionality
  analysis.duplicates = detectDuplicateFunctionality(analysis);

  return analysis;
}

async function analyzeTransitivePeerDependencies(projectPath) {
  // Analyze peer dependencies of all installed packages
  const nodeModulesPath = path.join(projectPath, 'node_modules');
  const packages = await getAllInstalledPackages(nodeModulesPath);

  const allPeerDeps = [];
  for (const pkg of packages) {
    const peerAnalysis = await analyzePeerDependencies(pkg.packageJson);
    allPeerDeps.push({
      package: pkg.name,
      version: pkg.version,
      peerDependencies: peerAnalysis
    });
  }

  // Detect conflicts across all packages
  const conflicts = await detectPeerDependencyConflicts(allPeerDeps);

  return {
    packages: allPeerDeps,
    conflicts
  };
}
```