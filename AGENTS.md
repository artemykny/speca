# Repository Guidelines

## Project Structure & Module Organization

- `docs/`: project documentation.
- `apps/`: all applications.

## Commit & Pull Request Guidelines

Use short, imperative commit subjects and keep commits focused. Pull requests should describe the purpose and validation, link relevant issues, and include screenshots for visual changes.

## Writing Documentation

Write Markdown under `docs/` for human readers. Use descriptive titles and lowercase kebab-case filenames.

Keep documentation concise. Use the fewest words needed to convey useful information.

### Scope and structure

- Describe directory structure in its README as an unordered list of links to immediate children, with short descriptions of their contents.
- Read existing documentation before writing. Extend the appropriate page instead of creating an overlapping document or fragmenting one topic across files.
- Give each page a clear reader need. Lead with the main idea, then explain details in a logical order. Separate instructions, reference material, and design rationale when they serve different needs.
- Use descriptive, sentence-case headings in a consistent hierarchy. Avoid empty sections, elaborate templates, and headings for every sentence.

### Duplication and links

- **Hard rule: NO duplication of any information, within a file or across files.** Before adding content, read the relevant documentation and check whether its meaning is already covered, even in different words. Keep each piece of information in one authoritative location; link to it instead of repeating, paraphrasing, or summarizing it. Remove duplication found in affected content. Context and standalone readability do not justify exceptions.
- Add links only when they help the reader go deeper or take a next step. Use descriptive text and relative paths for repository links. Avoid repeated links, reference chains, and lists of loosely related files.

### Language and formatting

- Use familiar words, active voice, explicit actors, and short sentences. Keep each paragraph focused on one idea.
- Use the same term for the same concept. Link unfamiliar terms to their authoritative definitions; avoid invented jargon and unnecessary acronyms.
- Delete filler, promotional claims, and obvious statements. Avoid phrases such as “This document explains,” “Implementation documents belong here,” “It is important to note,” “seamlessly,” and “simply.”
- Replace vague labels such as “simple,” “complex,” or “advanced” with the specific capabilities, constraints, or criteria that distinguish them. State what readers can do or what a feature supports.
- State behavior directly. Keep conversation history, agent progress reports, rhetorical contrasts, and repeated introductions or conclusions out of documentation.
- Prefer connected prose for explanations. Use numbered steps for sequences, bullets for parallel points, and tables for comparisons. Avoid deep nesting, excessive bold text, and decorative callouts.

### Accuracy and maintenance

- Understand each concept before documenting it. If its meaning is unclear, ask the user before writing.
- Never invent capabilities, guarantees, decisions, or requirements.
- Match detail to the page's purpose. Explain necessary prerequisites, conditions, outcomes, and relevant limitations without cataloguing hypothetical edge cases or unrelated implementation details.
- Use minimal, realistic examples with consistent names. Verify commands, paths, APIs, and expected results; label illustrative pseudocode. Use placeholders instead of real credentials or personal data.
- Rewrite affected passages when behavior changes; remove obsolete statements instead of appending corrections. Preserve useful decision rationale without retaining an editing diary.
- Review the complete page after editing. Check terminology, contradictions, links, and examples; remove anything that adds no useful information.
