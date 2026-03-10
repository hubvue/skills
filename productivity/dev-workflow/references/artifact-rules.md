# Artifact Rules

## General

1. Prefer updating existing artifacts over creating duplicate artifacts.
2. Preserve prior useful context; do not silently delete history.
3. If content becomes outdated, mark it as obsolete or superseded.
4. Keep sections clearly labeled.
5. Use explicit headings and structured bullets where useful.
6. Artifacts should be readable by both humans and agents.

## Required Minimum Sections

### task.md
- Background
- Goal
- Scope
- Non-goals
- Acceptance Criteria
- Constraints / Notes

### research.md
- Current Context
- Relevant Modules / Files
- Existing Behavior
- Risks / Unknowns
- Research Conclusion

### plan.md
- Problem Summary
- Proposed Solution
- Design Details
- Impacted Modules
- Risks
- Verification Strategy
- Testing Focus
- Revision History

### todo.md
- Work Items
- Dependencies
- Verification Mapping
- Status Summary

### implementation-log.md
- Summary of Changes
- Files / Modules Touched
- Commands Run
- Verification Results
- Deviations from Plan
- Next Notes

### test-cases.md
- Test Scope
- Functional Cases
- Edge Cases
- Failure / Exception Cases
- Regression Focus

### test-report.md
- Test Environment
- Executed Cases
- Pass / Fail Summary
- Defects Found
- Conclusion

### bug-list.md
- Bug Records
- Severity Summary
- Status Summary

### review-notes.md
- Review Scope
- Design Consistency
- Code Quality Notes
- Risks / Follow-ups
- Review Conclusion

## Brevity Rule

Do not create long narrative prose when a structured section is enough.
Prefer high-density, execution-useful documentation.
