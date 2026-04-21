# nicolascardona.com

Personal website for Nicolás Cardona — political scientist, data analyst, and data scientist. Built with a Windows 95/98 desktop aesthetic: draggable windows, taskbar with clock, retro chrome via 98.css.

## Stack

- **React 18** + **Vite 6**
- **React Router v6** — SPA routing with blog-compatible URL patterns
- **react-draggable v4** — draggable window shells
- **98.css** — Windows 98 chrome (title bars, buttons, borders)
- **marked** — Markdown → HTML for blog posts

## Project structure

```
src/
  components/
    Desktop/          # Desktop wrapper and icon grid
    Window/           # Draggable window shell + useWindowManager hook
    Taskbar/          # Bottom bar with clock
    windows/          # Content components for each window
  data/               # Static data: projects, papers, artwork
  pages/              # BlogPost standalone page
  posts/              # Blog posts as .md files with YAML frontmatter
  utils/              # loadPosts.js — markdown pipeline via import.meta.glob
public/
  images/
    projects/         # Project thumbnails
    art/              # Visual art gallery images
  _redirects          # Netlify SPA fallback
```

## Windows

| Window | Default open | Content |
|--------|-------------|---------|
| About Me | ✓ | Bio, skills, contact links |
| Projects | ✓ | Card grid with thumbnails |
| Articles | — | Blog post cards |
| Visual Art | — | Image gallery with lightbox |
| Papers | — | Academic publications list |

## Blog posts

Posts live in `src/posts/*.md` as Markdown files with YAML frontmatter:

```yaml
---
title: Post title
date: 2024-01-15
slug: url-slug
excerpt: Short summary
---

Post content here...
```

Routes supported:
- `/single-post/:slug`
- `/single-post/:year/:month/:day/:slug` (legacy Wix URL format)

## Adding content

**New blog post** — create `src/posts/my-post.md` with frontmatter above. Rebuild to publish.

**New project** — add an entry to `src/data/projects.js`. Drop the image in `public/images/projects/`.

**Visual art** — drop image in `public/images/art/`, add entry to `src/data/artwork.js`:
```js
{ id: 5, src: asset('images/art/filename.jpg'), caption: 'Title', alt: 'Description' }
```
`asset()` is imported at the top of the file and prepends `import.meta.env.BASE_URL` automatically.

**New paper/publication** — add entry to `src/data/papers.js`.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output to dist/
npm run preview   # preview production build
```

## Deployment

Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`).

Push to `master` → workflow builds, copies `index.html` → `404.html` (SPA routing fix), and deploys to Pages automatically.

`public/_redirects` is kept for potential Netlify fallback but is not the active deploy target.

## Scaling approach

98.css uses hardcoded 11px pixel measurements. Instead of fighting individual properties, `zoom: 1.35` is applied to `.window-shell` in `index.css` — this scales the entire window (chrome + content) proportionally. Mobile resets `zoom: 1` and switches to a stacked card layout.
