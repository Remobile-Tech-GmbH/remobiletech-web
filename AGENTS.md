<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project rules

- This project uses Zod 4. Follow the Zod 4 API (for example, `z.email()` and `z.treeifyError()`), not Zod 3 examples.
- Import Motion APIs from `motion/react` consistently; do not mix that path with barrel imports.
- Every locale page must call `setRequestLocale` so it remains eligible for static rendering.
- Keep `messages/en.json` and `messages/de.json` in exact key parity whenever translations change.
