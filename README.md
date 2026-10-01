# `data-cursor-ref` hydration mismatch

Next.js 16.3.8 (Turbopack). `npm run dev`, open the page, and the console reports a hydration mismatch.

The inline script in `app/layout.tsx` sets `data-cursor-ref` on `h1` and `p` while the document is parsing. That is what Cursor's built-in browser does. The attributes are not rendered by React. The text matches. The warning is only the extra attribute.
