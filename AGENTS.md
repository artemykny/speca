# Repository Guidelines

## Project Structure & Module Organization

- `docs/`: project documentation.
- `apps/`: all applications.

## Commit & Pull Request Guidelines

Use short, imperative commit subjects and keep commits focused. Pull requests should describe the purpose and validation, link relevant issues, and include screenshots for visual changes.

## Writing Documentation

Write Markdown under `docs/` for human readers. Use descriptive titles and lowercase kebab-case filenames.

Keep documentation concise. Use the fewest words needed to convey useful information.

Before adding content, check whether its meaning is already covered, even in different words

### Scope and structure

- Describe directory structure in its README as an unordered list of links to immediate children, with short descriptions of their contents.
- Read existing documentation before writing. Extend the appropriate page instead of creating an overlapping document or fragmenting one topic across files.
- Give each page a clear reader need. Lead with the main idea, then explain details in a logical order. Separate instructions, reference material, and design rationale when they serve different needs.
- Use descriptive, sentence-case headings in a consistent hierarchy. Avoid empty sections, elaborate templates, and headings for every sentence.

### Duplication and links

- Keep one authoritative explanation of each concept. Remove repeated definitions, rules, examples, and summaries within and across pages.
- Keep pages understandable without opening other files. Include the minimum local context; leave detailed explanations in their authoritative location.
- Add links only when they help the reader go deeper or take a next step. Use descriptive text and relative paths for repository links. Avoid repeated links, reference chains, and lists of loosely related files.

### Language and formatting

- Use familiar words, active voice, explicit actors, and short sentences. Keep each paragraph focused on one idea.
- Use the same term for the same concept. Define unfamiliar terms on first use; avoid invented jargon and unnecessary acronyms.
- Delete filler, promotional claims, vague qualifiers, and obvious statements. Avoid phrases such as “This document explains,” “Implementation documents belong here,” “It is important to note,” “seamlessly,” and “simply.”
- State behavior directly. Keep conversation history, agent progress reports, rhetorical contrasts, and repeated introductions or conclusions out of documentation.
- Prefer connected prose for explanations. Use numbered steps for sequences, bullets for parallel points, and tables for comparisons. Avoid deep nesting, excessive bold text, and decorative callouts.

### Accuracy and maintenance

- Never invent capabilities, guarantees, decisions, or requirements.
- Match detail to the page's purpose. Explain necessary prerequisites, conditions, outcomes, and relevant limitations without cataloguing hypothetical edge cases or unrelated implementation details.
- Use minimal, realistic examples with consistent names. Verify commands, paths, APIs, and expected results; label illustrative pseudocode. Use placeholders instead of real credentials or personal data.
- Rewrite affected passages when behavior changes; remove obsolete statements instead of appending corrections. Preserve useful decision rationale without retaining an editing diary.
- Review the complete page after editing. Check terminology, contradictions, links, and examples; remove anything that adds no useful information. Ensure readers can understand the topic or complete the task without reconstructing context from other pages.
