# Blog API (separate from static OVH deploy)

These route handlers were moved out of `app/api` because `output: 'export'` in `next.config.ts` cannot ship Next.js API routes on shared hosting.

Deploy this folder as a small Node server (or copy handlers into your backend) and proxy the main site’s `/api/*` to that server, **or** set `NEXT_PUBLIC_API_BASE_URL` on the frontend when you wire it up.

Paths preserved from the former App Router API:

- `GET /api/blogs`
- `GET /api/blogs/:slug`
- Disabled: `POST`, `PUT`, `DELETE`, generate-blog, generate-image
