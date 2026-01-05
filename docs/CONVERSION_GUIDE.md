# Component Conversion Guide (Beginner-friendly)

Goal: Make component code easier to read for beginners while keeping the exact same functionality and UI.

Principles
- Use clear, descriptive variable and function names (e.g., `rows` -> `recruitments`, `apiData` -> `apiData`).
- Add short comments for sections (loading, localStorage, filtering, pagination, actions).
- Extract small helper functions for discrete actions (e.g., `archiveRecruitment`, `deleteRecruitment`, `changeStatus`).
- Keep UI, markup, and class names unchanged unless required.
- Prefer simple, explicit TypeScript types and avoid over-condensed patterns.
- Do not change component props or external behavior.

Checklist per component
1. Read the component and tests (if any).
2. Create a minimal refactor that improves readability only.
3. Run the dev server and verify no UI/behavior change.
4. Commit the change and add a short note in the commit message describing the edits.

Example (pattern)
- Before: long inline logic inside JSX, terse names.
- After: move logic into a small function above JSX, rename variables, add a 1-2 line comment.

If you want me to proceed, I can convert components one by one and open commits/PRs — tell me if you want to review after each file or after a batch.
