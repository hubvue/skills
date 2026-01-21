#!/usr/bin/env node

/**
 * Report Generator for Dependency Analysis
 * Generates various report formats from analysis results
 */

const fs = require('fs').promises;
const path = require('path');

class ReportGenerator {
    constructor(analysisResult, outputPath) {
        this.result = analysisResult;
        this.outputPath = outputPath || process.cwd();
    }

    async generateAll() {
        await Promise.all([
            this.generateMarkdownReport(),
            this.generateJsonSummary(),
            this.generateCsvReport(),
            this.generateTeamCityReport(),
            this.generateGitHubActionsReport()
        ]);
    }

    async generateMarkdownReport() {
        const markdown = this.buildMarkdownReport();
        const filePath = path.join(this.outputPath, 'DEPENDENCY_ANALYSIS_REPORT.md');
        await fs.writeFile(filePath, markdown);
        return filePath;
    }

    buildMarkdownReport() {
        const { result } = this;
        const totalSize = this.calculateTotalSize();

        let markdown = `# Dependency Analysis Report

**Project:** ${result.project.name} v${result.project.version}
**Generated:** ${new Date(result.timestamp).toLocaleString()}
**Duration:** ${result.metadata.duration}ms

## Summary

| Metric | Count | Impact |
|--------|-------|---------|
| Total Dependencies | ${result.summary.total} | - |
| Unused Dependencies | ${result.summary.unused} | ${this.formatSize(this.calculateUnusedSize())} |
| Missing Dependencies | ${result.summary.missing} | 🚨 Critical |
| Phantom Dependencies | ${result.summary.phantom} | ⚠️ Risk |
| Vulnerable Packages | ${result.summary.vulnerable} | 🔒 Security |
| Outdated Packages | ${result.summary.outdated} | 📦 Updates |
| Version Conflicts | ${result.summary.versionConflicts} | 🔥 Conflicts |
| Circular Dependencies | ${result.summary.circular} | 🔄 Loops |

## Dependency Categories

`;

        // Add category breakdown
        for (const [category, info] of Object.entries(result.categories)) {
            markdown += `- **${category.charAt(0).toUpperCase() + category.slice(1)}**: ${info.count} packages\n`;
        }

        // Add high priority recommendations
        if (result.recommendations.high.length > 0) {
            markdown += `\n## 🚨 High Priority Issues\n\n`;
            for (const rec of result.recommendations.high) {
                markdown += `### ${rec.title}\n`;
                markdown += `${rec.description}\n`;
                markdown += `**Action:** ${rec.action}\n\n`;
            }
        }

        // Add medium priority recommendations
        if (result.recommendations.medium.length > 0) {
            markdown += `\n## ⚠️ Medium Priority Issues\n\n`;
            for (const rec of result.recommendations.medium) {
                markdown += `### ${rec.title}\n`;
                markdown += `${rec.description}\n`;
                markdown += `**Action:** ${rec.action}\n\n`;
            }
        }

        // Add detailed issues if any
        if (result.issues.vulnerable.length > 0) {
            markdown += `\n## 🔒 Security Vulnerabilities\n\n`;
            for (const vuln of result.issues.vulnerable) {
                markdown += `- **${vuln.name}** (${vuln.version}): ${vuln.title}\n`;
                markdown += `  - Severity: ${vuln.severity}\n`;
                markdown += `  - Patched in: ${vuln.patchedIn}\n`;
                markdown += `  - [More info](${vuln.url})\n\n`;
            }
        }

        if (result.issues.unused.length > 0) {
            markdown += `\n## 🗑️ Unused Dependencies\n\n`;
            markdown += `Total size that can be saved: ${this.formatSize(this.calculateUnusedSize())}\n\n`;
            for (const unused of result.issues.unused.slice(0, 10)) {
                markdown += `- **${unused.name}** (${unused.version}) - ${unused.reason}\n`;
                markdown += `  - Type: ${unused.type}\n`;
                markdown += `  - Size: ${unused.size}\n\n`;
            }
            if (result.issues.unused.length > 10) {
                markdown += `... and ${result.issues.unused.length - 10} more\n\n`;
            }
        }

        // Add quick fix commands
        markdown += `\n## Quick Fix Commands\n\n`;
        markdown += `\`\`\`bash\n`;
        if (result.issues.missing.length > 0) {
            const missing = result.issues.missing
                .filter(m => m.type !== 'peer-dependency')
                .map(m => m.name)
                .join(' ');
            markdown += `# Install missing dependencies\n`;
            markdown += `npm install ${missing}\n\n`;
        }
        if (result.issues.unused.length > 0) {
            const unused = result.issues.unused
                .filter(u => u.confidence === 'high')
                .map(u => u.name)
                .join(' ');
            if (unused) {
                markdown += `# Remove unused dependencies\n`;
                markdown += `npm uninstall ${unused}\n\n`;
            }
        }
        markdown += `# Update all packages\n`;
        markdown += `npm update\n\n`;
        markdown += `# Check for vulnerabilities\n`;
        markdown += `npm audit\n`;
        markdown += `\`\`\`\n`;

        return markdown;
    }

    async generateJsonSummary() {
        const summary = {
            project: this.result.project,
            timestamp: this.result.timestamp,
            summary: this.result.summary,
            recommendations: this.result.recommendations,
            healthScore: this.calculateHealthScore()
        };

        const filePath = path.join(this.outputPath, 'dependency-summary.json');
        await fs.writeFile(filePath, JSON.stringify(summary, null, 2));
        return filePath;
    }

    async generateCsvReport() {
        let csv = 'Type,Name,Version,Category,Severity,Size,Action\n';

        // Add unused dependencies
        for (const unused of this.result.issues.unused) {
            csv += `Unused,${unused.name},${unused.version},${unused.category},Medium,${unused.size},"Remove from ${unused.type}"\n`;
        }

        // Add missing dependencies
        for (const missing of this.result.issues.missing) {
            csv += `Missing,${missing.name},-,-,${missing.severity},-,"${missing.npmCommand}"\n`;
        }

        // Add vulnerable packages
        for (const vuln of this.result.issues.vulnerable) {
            csv += `Vulnerable,${vuln.name},${vuln.version},-,${vuln.severity},-,"Update to ${vuln.patchedIn}"\n`;
        }

        // Add outdated packages
        for (const outdated of this.result.issues.outdated) {
            csv += `Outdated,${outdated.name},${outdated.current},${outdated.category},Low,-,"Update to ${outdated.latest}"\n`;
        }

        const filePath = path.join(this.outputPath, 'dependency-issues.csv');
        await fs.writeFile(filePath, csv);
        return filePath;
    }

    async generateTeamCityReport() {
        let report = '';

        // Add build problems
        if (this.result.issues.vulnerable.length > 0) {
            report += `##teamcity[buildProblem description='Found ${this.result.issues.vulnerable.length} vulnerable packages' identity='vulnerabilities']\n`;
        }

        if (this.result.issues.missing.length > 0) {
            report += `##teamcity[buildProblem description='Found ${this.result.issues.missing.length} missing dependencies' identity='missing-deps']\n`;
        }

        // Add statistics
        report += `##teamcity[buildStatisticValue key='dependency_total' value='${this.result.summary.total}']\n`;
        report += `##teamcity[buildStatisticValue key='dependency_unused' value='${this.result.summary.unused}']\n`;
        report += `##teamcity[buildStatisticValue key='dependency_vulnerable' value='${this.result.summary.vulnerable}']\n`;
        report += `##teamcity[buildStatisticValue key='dependency_outdated' value='${this.result.summary.outdated}']\n`;
        report += `##teamcity[buildStatisticValue key='dependency_health_score' value='${this.calculateHealthScore()}']\n`;

        const filePath = path.join(this.outputPath, 'teamcity-report.txt');
        await fs.writeFile(filePath, report);
        return filePath;
    }

    async generateGitHubActionsReport() {
        const annotations = [];

        // Create annotations for issues
        for (const missing of this.result.issues.missing) {
            for (const usage of missing.usedIn) {
                annotations.push({
                    file: usage.file,
                    line: usage.line,
                    annotation_level: 'failure',
                    title: 'Missing Dependency',
                    message: `Package '${missing.name}' is not installed. Run: ${missing.npmCommand}`
                });
            }
        }

        for (const unused of this.result.issues.unused) {
            annotations.push({
                file: 'package.json',
                line: 1,
                annotation_level: 'warning',
                title: 'Unused Dependency',
                message: `Package '${unused.name}' (${unused.size}) appears to be unused. Consider removing it.`
            });
        }

        for (const vuln of this.result.issues.vulnerable) {
            annotations.push({
                file: 'package.json',
                line: 1,
                annotation_level: 'failure',
                title: 'Security Vulnerability',
                message: `${vuln.name}@${vuln.version} has a ${vuln.severity} vulnerability: ${vuln.title}`
            });
        }

        const report = {
            title: 'Dependency Analysis Report',
            summary: this.generateSummary(),
            annotations: annotations.slice(0, 50) // GitHub has limits
        };

        const filePath = path.join(this.outputPath, 'github-actions-report.json');
        await fs.writeFile(filePath, JSON.stringify(report, null, 2));
        return filePath;
    }

    generateSummary() {
        const { result } = this;
        let summary = `Found ${result.summary.total} dependencies:\n\n`;

        if (result.summary.vulnerable > 0) {
            summary += `- 🔴 ${result.summary.vulnerable} vulnerable packages\n`;
        }
        if (result.summary.missing > 0) {
            summary += `- 🚨 ${result.summary.missing} missing dependencies\n`;
        }
        if (result.summary.unused > 0) {
            summary += `- 🟡 ${result.summary.unused} unused dependencies (${this.formatSize(this.calculateUnusedSize())})\n`;
        }
        if (result.summary.outdated > 0) {
            summary += `- 🔄 ${result.summary.outdated} outdated packages\n`;
        }

        summary += `\nHealth Score: ${this.calculateHealthScore()}/100`;

        return summary;
    }

    calculateHealthScore() {
        let score = 100;

        // Deduct points for issues
        score -= Math.min(40, this.result.summary.vulnerable * 20);
        score -= Math.min(30, this.result.summary.missing * 10);
        score -= Math.min(20, this.result.summary.unused * 2);
        score -= Math.min(10, this.result.summary.outdated);
        score -= Math.min(15, this.result.summary.versionConflicts * 5);

        return Math.max(0, Math.round(score));
    }

    calculateUnusedSize() {
        return this.result.issues.unused.reduce((total, dep) => {
            const size = parseInt(dep.size) || 0;
            return total + size;
        }, 0);
    }

    calculateTotalSize() {
        let total = 0;
        for (const category of Object.values(this.result.categories)) {
            for (const pkg of category.packages) {
                total += parseInt(pkg.size) || 0;
            }
        }
        return total;
    }

    formatSize(bytes) {
        if (bytes === 0) return '0B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error('Usage: node generate-report.js <analysis-result.json> <output-directory>');
        process.exit(1);
    }

    const [resultFile, outputPath] = args;

    fs.readFile(resultFile, 'utf-8')
        .then(content => {
            const result = JSON.parse(content);
            const generator = new ReportGenerator(result, outputPath);
            return generator.generateAll();
        })
        .then(() => {
            console.log('✅ Reports generated successfully');
        })
        .catch(error => {
            console.error('❌ Failed to generate reports:', error.message);
            process.exit(1);
        });
}

module.exports = ReportGenerator;
