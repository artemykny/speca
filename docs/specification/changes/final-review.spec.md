# Final review specification

## Requirements

### Requirement: Final review availability

Speca SHALL make final review available only after propagation finishes and all refreshes in the change are approved.

#### Scenario: Wait for a refresh approval

- **GIVEN** a refresh is still awaiting approval
- **WHEN** the user inspects the change
- **THEN** final review is unavailable

#### Scenario: Open final review

- **GIVEN** propagation has finished and every refresh is approved
- **WHEN** the user opens the change
- **THEN** final review is available

### Requirement: Final review contents

Speca SHALL show the combined diff from before the change began to its final result, attributing each changed file to the plan or an approved refresh and listing reviewed files without content changes separately.

#### Scenario: Review combined work

- **GIVEN** a plan edited product requirements, a refresh edited design, and triage confirmed code needed no changes
- **WHEN** the user opens final review
- **THEN** the combined diff attributes product changes to the plan and design changes to the approved refresh
- **AND** code appears in the separate list of reviewed files without content changes
