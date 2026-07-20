#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PHASES = [
    ['intake', '00-idea-intake.md', 'research/00-intake-research.md'],
    ['motivation', '01-motivation.md', 'research/01-motivation-research.md'],
    ['users', '02-users.md', 'research/02-users-research.md'],
    ['scenarios', '03-scenarios.md', 'research/03-scenarios-research.md'],
    ['painpoints', '04-painpoints.md', 'research/04-painpoints-research.md'],
    ['value', '05-value.md', 'research/05-value-research.md'],
    ['feasibility', '06-feasibility.md', 'research/06-feasibility-research.md'],
    ['goals', '07-goals.md', 'research/07-goals-research.md'],
    ['solution', '08-solution.md', 'research/08-solution-research.md'],
    ['scope', '09-scope.md', 'research/09-scope-research.md'],
    ['acceptance', '10-acceptance.md', 'research/10-acceptance-research.md'],
    ['assemble', '11-requirement.md', 'research/11-assemble-research.md']
];

const VALID_WORKFLOW_STATUS = new Set(['active', 'paused', 'completed', 'closed']);
const VALID_FINAL_DECISIONS = new Set(['pending', 'approved_requirement', 'idea_pool', 'deferred', 'rejected']);
const VALID_INPUT_GATES = new Set(['unchecked', 'needs_context', 'ready']);
const VALID_OUTPUT_GATES = new Set(['unchecked', 'passed', 'failed']);
const VALID_RUN_MODES = new Set(['target', 'revision', 'reflow', 'recovery']);

function readJson(filePath, errors) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        errors.push(`${path.relative(process.cwd(), filePath)}: ${error.message}`);
        return null;
    }
}

function requireFile(workspace, relativePath, errors) {
    if (!fs.existsSync(path.join(workspace, relativePath))) {
        errors.push(`Missing required artifact: ${relativePath}`);
    }
}

function validatePhaseRecord(workspace, name, artifact, researchArtifact, record, earlierValid, errors) {
    if (!record || typeof record !== 'object') {
        errors.push(`Missing phase record: ${name}`);
        return false;
    }

    if (record.artifact !== artifact) {
        errors.push(`${name}.artifact must be ${artifact}`);
    }
    if (record.researchArtifact !== researchArtifact) {
        errors.push(`${name}.researchArtifact must be ${researchArtifact}`);
    }
    if (!Number.isInteger(record.revision) || record.revision < 0) {
        errors.push(`${name}.revision must be a non-negative integer`);
    }

    const gate = record.qualityGate;
    if (!gate || !VALID_INPUT_GATES.has(gate.input) || !VALID_OUTPUT_GATES.has(gate.output)) {
        errors.push(`${name}.qualityGate is invalid`);
    }
    if (gate && !Array.isArray(gate.missingFields)) {
        errors.push(`${name}.qualityGate.missingFields must be an array`);
    }
    if (gate && (!Number.isInteger(gate.questionCount) || gate.questionCount < 0)) {
        errors.push(`${name}.qualityGate.questionCount must be a non-negative integer`);
    }

    const expectedDecisions = {
        pending: [null],
        running: [null],
        passed: ['continue'],
        stale: [null, 'revise'],
        needs_data: ['need_data'],
        blocked: ['retry'],
        stopped: ['stop']
    };
    if (!Object.prototype.hasOwnProperty.call(expectedDecisions, record.status)) {
        errors.push(`${name}.status is invalid: ${record.status}`);
        return false;
    }
    if (!expectedDecisions[record.status].includes(record.decision ?? null)) {
        errors.push(`${name} has invalid status/decision pair: ${record.status}/${record.decision}`);
    }
    if (record.status === 'blocked' && !record.error) {
        errors.push(`${name}.error is required when blocked`);
    }

    if (record.status === 'passed') {
        if (record.revision < 1) {
            errors.push(`${name}.revision must be at least 1 when passed`);
        }
        if (!earlierValid) {
            errors.push(`${name} is passed while an earlier phase is unresolved`);
        }
        if (!gate || gate.input !== 'ready' || gate.output !== 'passed') {
            errors.push(`${name} is passed without both quality gates`);
        }
        requireFile(workspace, artifact, errors);
        requireFile(workspace, researchArtifact, errors);
        return earlierValid && gate && gate.input === 'ready' && gate.output === 'passed' &&
            fs.existsSync(path.join(workspace, artifact)) && fs.existsSync(path.join(workspace, researchArtifact));
    }

    return false;
}

function validateSources(workspace, errors) {
    const sourcePath = path.join(workspace, 'sources/sources.json');
    const registry = readJson(sourcePath, errors);
    if (!registry) return;
    if (!Array.isArray(registry.sources)) {
        errors.push('sources/sources.json must contain a sources array');
        return;
    }

    const ids = new Set();
    const urls = new Set();
    for (const source of registry.sources) {
        if (!source.id || ids.has(source.id)) {
            errors.push(`Duplicate or missing source id: ${source.id}`);
        }
        ids.add(source.id);
        if (source.canonicalUrl) {
            if (urls.has(source.canonicalUrl)) {
                errors.push(`Duplicate canonicalUrl: ${source.canonicalUrl}`);
            }
            urls.add(source.canonicalUrl);
        }
    }
}

function validateLog(workspace, errors) {
    const logPath = path.join(workspace, 'logs/workflow.log');
    if (!fs.existsSync(logPath)) return;
    const lines = fs.readFileSync(logPath, 'utf8').split(/\r?\n/).filter(Boolean);
    lines.forEach((line, index) => {
        try {
            const event = JSON.parse(line);
            if (!event.at || !event.event || !event.data) {
                errors.push(`workflow.log line ${index + 1} lacks at, event, or data`);
            }
        } catch (error) {
            errors.push(`workflow.log line ${index + 1}: ${error.message}`);
        }
    });
}

function validateActivePointer(workspace, status, errors) {
    const incubationRoot = path.dirname(path.dirname(workspace));
    const activePath = path.join(incubationRoot, 'active.json');
    if (!fs.existsSync(activePath)) return;
    const active = readJson(activePath, errors);
    if (!active || active.pendingSelection) return;
    const expectedWorkspace = path.relative(incubationRoot, workspace);
    if (active.ideaId !== status.ideaId) {
        errors.push('active.json ideaId does not match status.json');
    }
    if (active.workspace !== expectedWorkspace) {
        errors.push(`active.json workspace must be ${expectedWorkspace}`);
    }
}

function validateWorkspace(workspace) {
    const startedAt = Date.now();
    const errors = [];
    const resolved = path.resolve(workspace);
    const statusPath = path.join(resolved, 'status.json');
    const status = readJson(statusPath, errors);

    if (!status) return { success: false, errors };
    if (status.schemaVersion !== 2) errors.push('status.schemaVersion must be 2');
    if (status.skill !== 'idea-incubation') errors.push('status.skill must be idea-incubation');
    if (!VALID_WORKFLOW_STATUS.has(status.workflowStatus)) errors.push('Invalid workflowStatus');
    if (!VALID_FINAL_DECISIONS.has(status.decision)) errors.push('Invalid final decision');
    if (['active', 'paused'].includes(status.workflowStatus) && status.decision !== 'pending') {
        errors.push(`${status.workflowStatus} workflow requires pending final decision`);
    }
    if (status.activeRun && !VALID_RUN_MODES.has(status.activeRun.mode)) {
        errors.push('activeRun.mode is invalid');
    }

    const phaseKeys = Object.keys(status.phases || {}).sort();
    const canonicalKeys = PHASES.map(([name]) => name).sort();
    if (JSON.stringify(phaseKeys) !== JSON.stringify(canonicalKeys)) {
        errors.push('status.phases must contain exactly the twelve canonical phases');
    }

    let validPrefix = true;
    let highestMeaningfulPhase = null;
    for (const [name, artifact, researchArtifact] of PHASES) {
        const passed = validatePhaseRecord(
            resolved, name, artifact, researchArtifact, status.phases && status.phases[name], validPrefix, errors
        );
        if (validPrefix && passed) {
            highestMeaningfulPhase = name;
        } else {
            validPrefix = false;
        }
    }

    if ((status.highestMeaningfulPhase ?? null) !== highestMeaningfulPhase) {
        errors.push(`highestMeaningfulPhase must be ${highestMeaningfulPhase}`);
    }

    const running = PHASES.filter(([name]) => status.phases?.[name]?.status === 'running').map(([name]) => name);
    if (running.length > 1) errors.push('At most one phase may be running');

    const pausedPhase = PHASES.find(([name]) => ['needs_data', 'blocked'].includes(status.phases?.[name]?.status))?.[0];
    const stoppedPhase = PHASES.find(([name]) => status.phases?.[name]?.status === 'stopped')?.[0];
    const highestIndex = PHASES.findIndex(([name]) => name === highestMeaningfulPhase);
    const nextPhase = PHASES[Math.min(highestIndex + 1, PHASES.length - 1)][0];
    let expectedCurrent = nextPhase;
    if (running.length === 1) expectedCurrent = running[0];
    if (status.workflowStatus === 'paused' && pausedPhase) expectedCurrent = pausedPhase;
    if (status.workflowStatus === 'closed' && stoppedPhase) expectedCurrent = stoppedPhase;
    if (status.workflowStatus === 'completed') expectedCurrent = 'assemble';
    if (status.currentPhase !== expectedCurrent) {
        errors.push(`currentPhase must be ${expectedCurrent}`);
    }

    if (status.pendingQuestion) {
        const question = status.pendingQuestion;
        const phase = status.phases?.[question.phase];
        if (status.workflowStatus !== 'paused') errors.push('pendingQuestion requires paused workflow');
        if (question.phase !== status.currentPhase) errors.push('pendingQuestion.phase must equal currentPhase');
        if (!phase || phase.status !== 'needs_data' || phase.decision !== 'need_data') {
            errors.push('pendingQuestion phase must use needs_data/need_data');
        }
        if (!phase || phase.qualityGate?.input !== 'needs_context') {
            errors.push('pendingQuestion phase input gate must be needs_context');
        }
        if (!phase || phase.qualityGate?.questionCount < 1) {
            errors.push('pendingQuestion phase questionCount must be positive');
        }
        if (!status.activeRun) errors.push('pendingQuestion requires activeRun');
    }
    const contextWaiting = PHASES.filter(([name]) => status.phases?.[name]?.qualityGate?.input === 'needs_context');
    if (contextWaiting.length > 1) errors.push('At most one phase may wait for user context');
    if (contextWaiting.length === 1 && !status.pendingQuestion) {
        errors.push('needs_context requires one pendingQuestion');
    }

    if (status.workflowStatus === 'completed') {
        if (status.phases?.assemble?.status !== 'passed') errors.push('completed requires assemble passed');
        if (status.decision === 'pending') errors.push('completed requires a final decision');
        if (status.pendingQuestion) errors.push('completed cannot have a pending question');
        requireFile(resolved, 'decision.md', errors);
        requireFile(resolved, 'sources/source-summary.md', errors);
    }
    if (status.workflowStatus === 'closed' && !['idea_pool', 'deferred', 'rejected'].includes(status.decision)) {
        errors.push('closed requires idea_pool, deferred, or rejected');
    }
    if (status.workflowStatus === 'closed') {
        if (!stoppedPhase) errors.push('closed requires one stopped phase');
        requireFile(resolved, 'decision.md', errors);
    }

    validateSources(resolved, errors);
    validateLog(resolved, errors);
    validateActivePointer(resolved, status, errors);

    return {
        success: errors.length === 0,
        data: {
            workspace: resolved,
            highestMeaningfulPhase,
            currentPhase: status.currentPhase,
            workflowStatus: status.workflowStatus
        },
        errors,
        metadata: {
            analyzedAt: new Date().toISOString(),
            duration: Date.now() - startedAt
        }
    };
}

if (require.main === module) {
    const workspace = process.argv[2];
    if (!workspace) {
        console.error('Usage: validate-workspace.js <idea-workspace>');
        process.exit(1);
    }
    const result = validateWorkspace(workspace);
    const output = JSON.stringify(result, null, 2);
    if (!result.success) {
        console.error(output);
        process.exit(1);
    }
    console.log(output);
}

module.exports = { validateWorkspace };
