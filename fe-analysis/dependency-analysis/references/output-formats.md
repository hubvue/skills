# Dependency Analysis Output Formats

This reference contains detailed output formats for different types of dependency analysis reports.

## Standard JSON Output

### Complete Analysis Response
```json
{
  "success": true,
  "data": {
    "summary": {
      "total": 150,
      "unused": 5,
      "missing": 2,
      "phantom": 3,
      "outdated": 10,
      "vulnerable": 1,
      "peerConflicts": 2,
      "circular": 1
    },
    "unused": [
      {
        "name": "lodash",
        "version": "^4.17.21",
        "type": "dependencies",
        "category": "utility",
        "confidence": "high",
        "reason": "Not imported in any source file"
      }
    ],
    "missing": [
      {
        "name": "axios",
        "type": "missing-dependency",
        "usedIn": [
          {
            "file": "src/api/request.js",
            "line": 1,
            "type": "import"
          }
        ],
        "suggestedType": "dependencies",
        "confidence": "high"
      }
    ],
    "phantom": [
      {
        "name": "vue-router",
        "version": "4.2.5",
        "usedIn": ["src/router/index.js"],
        "risk": "medium",
        "suggestion": "Add to dependencies"
      }
    ],
    "peerConflicts": [
      {
        "type": "cross-package-conflict",
        "package": "eslint-plugin-react",
        "message": "Multiple packages require different versions of react",
        "severity": "medium",
        "requirements": [
          {
            "package": "eslint-plugin-react-hooks",
            "version": "^16.8.0 || ^17.0.0"
          },
          {
            "package": "eslint-plugin-react",
            "version": "^18.0.0"
          }
        ]
      }
    ],
    "outdated": [
      {
        "name": "webpack",
        "current": "^4.46.0",
        "latest": "5.88.2",
        "type": "devDependencies",
        "category": "build-tool"
      }
    ],
    "vulnerable": [
      {
        "name": "lodash",
        "version": "4.17.15",
        "severity": "medium",
        "recommendation": "Upgrade to latest version",
        "advisory": "Known security vulnerability"
      }
    ],
    "circular": [
      {
        "path": ["src/moduleA.js", "src/moduleB.js", "src/moduleA.js"],
        "severity": "high"
      }
    ],
    "health": {
      "score": 75,
      "issues": [
        "Remove 5 unused dependencies",
        "Install 2 missing dependencies",
        "Resolve 2 peer dependency conflicts"
      ]
    },
    "dependencies": {
      "react": {
        "version": "^18.2.0",
        "type": "dependencies",
        "category": "framework"
      }
    },
    "peerDependencies": {
      "summary": {
        "totalPackages": 150,
        "packagesWithPeerDeps": 12,
        "totalPeerDeps": 18,
        "conflicts": 2,
        "missing": 3
      },
      "packages": [...],
      "recommendations": [...]
    }
  },
  "warnings": [
    "Some dependencies could not be analyzed due to syntax errors"
  ],
  "metadata": {
    "analyzedAt": "2024-12-13T10:00:00Z",
    "duration": 2500,
    "scope": "all",
    "filesAnalyzed": 245
  }
}
```

## Summary Report Format

### Executive Summary
```json
{
  "projectHealth": "good",
  "score": 75,
  "issues": {
    "critical": 1,
    "high": 3,
    "medium": 5,
    "low": 2
  },
  "recommendations": [
    {
      "priority": "high",
      "action": "Remove unused dependencies",
      "count": 5,
      "impact": "Reduce bundle size"
    },
    {
      "priority": "medium",
      "action": "Update outdated packages",
      "count": 10,
      "impact": "Security improvements"
    }
  ],
  "metrics": {
    "totalDependencies": 150,
    "productionDeps": 45,
    "developmentDeps": 105,
    "bundleSizeEstimate": "2.5MB"
  }
}
```

## Detailed Dependency List

### Per-Package Information
```json
{
  "name": "react",
  "version": "^18.2.0",
  "type": "dependencies",
  "category": "framework",
  "size": "245KB",
  "license": "MIT",
  "usedIn": [
    {
      "file": "src/App.tsx",
      "line": 1,
      "type": "import"
    },
    {
      "file": "src/components/Button.tsx",
      "line": 1,
      "type": "import"
    }
  ],
  "dependents": [
    "react-dom",
    "@testing-library/react",
    "eslint-plugin-react"
  ],
  "peerDependencyFor": [
    "react-router-dom",
    "@reduxjs/toolkit"
  ],
  "issues": [],
  "health": "good"
}
```

## Peer Dependency Report

### Detailed Peer Analysis
```json
{
  "peerDependencyAnalysis": {
    "summary": {
      "totalPackages": 12,
      "totalPeerDeps": 18,
      "conflicts": 2,
      "missing": 3,
      "compatible": 13
    },
    "packages": [
      {
        "name": "eslint-plugin-react",
        "version": "7.33.2",
        "peerDependencies": [
          {
            "name": "react",
            "requiredVersion": "^16.8.0 || ^17.0.0 || ^18.0.0",
            "installed": true,
            "installedVersion": "18.2.0",
            "isCompatible": true,
            "isOptional": false
          }
        ],
        "missing": [],
        "conflicts": []
      }
    ],
    "conflicts": [
      {
        "type": "version-conflict",
        "package": "react",
        "severity": "high",
        "requirements": [
          {
            "package": "eslint-plugin-react",
            "required": "^16.8.0 || ^17.0.0 || ^18.0.0"
          },
          {
            "package": "react-compiler",
            "required": "^18.0.0"
          }
        ],
        "resolution": "All requirements are compatible"
      }
    ],
    "recommendations": [
      {
        "priority": "high",
        "type": "install-missing",
        "message": "Install 3 missing peer dependencies",
        "dependencies": [
          {
            "name": "react-dom",
            "version": "^18.2.0",
            "reason": "Required by react"
          }
        ]
      }
    ]
  }
}
```

## Circular Dependency Report

### Detailed Cycle Information
```json
{
  "circularDependencies": {
    "summary": {
      "totalCycles": 1,
      "severityBreakdown": {
        "high": 1,
        "medium": 0,
        "low": 0
      }
    },
    "cycles": [
      {
        "id": "cycle_001",
        "path": [
          "src/components/A.jsx",
          "src/components/B.jsx",
          "src/utils/helper.js",
          "src/components/A.jsx"
        ],
        "length": 4,
        "severity": "high",
        "impact": "May cause runtime errors and bundling issues",
        "suggestion": "Extract common functionality to separate module",
        "visualization": {
          "nodes": ["A", "B", "helper"],
          "edges": [
            {"from": "A", "to": "B"},
            {"from": "B", "to": "helper"},
            {"from": "helper", "to": "A"}
          ]
        }
      }
    ]
  }
}
```

## Security Report

### Vulnerability Analysis
```json
{
  "securityAnalysis": {
    "summary": {
      "totalVulnerabilities": 1,
      "severityBreakdown": {
        "critical": 0,
        "high": 0,
        "medium": 1,
        "low": 0
      },
      "affectedPackages": 1
    },
    "vulnerabilities": [
      {
        "package": "lodash",
        "installedVersion": "4.17.15",
        "vulnerableVersions": "<4.17.21",
        "severity": "medium",
        "cve": "CVE-2021-23337",
        "title": "Prototype Pollution",
        "description": "Prototype pollution vulnerability in lodash",
        "recommendation": "Upgrade to version 4.17.21 or later",
        "patchedVersions": [">=4.17.21"],
        "references": [
          "https://nvd.nist.gov/vuln/detail/CVE-2021-23337"
        ]
      }
    ],
    "recommendations": [
      {
        "priority": "high",
        "action": "Update vulnerable packages",
        "packages": ["lodash"],
        "command": "npm update lodash"
      }
    ]
  }
}
```

## Bundle Impact Analysis

### Size and Performance Impact
```json
{
  "bundleImpact": {
    "totalSize": "2.5MB",
    "unusedSize": "450KB",
    "duplicateSize": "120KB",
    "breakdown": {
      "frameworks": "1.2MB",
      "utilities": "800KB",
      "ui": "500KB"
    },
    "optimizationPotential": {
      "removingUnused": "450KB (18%)",
      "treeShaking": "200KB (8%)",
      "codeSplitting": "300KB (12%)"
    },
    "recommendations": [
      {
        "action": "Remove unused lodash functions",
        "savings": "80KB",
        "effort": "low"
      }
    ]
  }
}
```

## Comparison Format

### Before/After Analysis
```json
{
  "comparison": {
    "before": {
      "totalDependencies": 155,
      "securityScore": 65,
      "bundleSize": "2.8MB",
      "issues": 23
    },
    "after": {
      "totalDependencies": 150,
      "securityScore": 85,
      "bundleSize": "2.3MB",
      "issues": 8
    },
    "improvements": {
      "removedDependencies": 5,
      "securityImprovement": 20,
      "sizeReduction": "500KB",
      "issuesResolved": 15
    }
  }
}
```

## Export Formats

### CSV Export
```csv
Package,Version,Type,Category,Used,Size,Issues,Recommendation
react,^18.2.0,dependencies,framework,true,245KB,,Keep
lodash,^4.17.21,dependencies,utility,false,0KB,Remove unused
```

### Markdown Table
| Package | Version | Type | Category | Used | Size | Issues |
|---------|---------|------|----------|------|------|--------|
| react | ^18.2.0 | dependencies | framework | ✅ | 245KB | - |
| lodash | ^4.17.21 | dependencies | utility | ❌ | 0KB | Remove unused |

