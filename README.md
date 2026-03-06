# Portfolio Project

A minimal, dark-mode personal portfolio site built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

---

## Overview

This is my personal portfolio website. It features a single-page architecture with smooth fade transitions between sections, a custom animated cursor, and a clean typographic layout inspired by high-end design portfolios.

Live at: **[danielfwhite1.github.io](https://danielfwhite1.github.io)**

---

## Features

- **Single-page navigation** — About, Experience, and Contact sections expand and collapse in place with a 280ms fade transition
- **Custom cursor** — a dot + lagging ring with amber hover states and platform-specific floating icons on Contact links
- **Photo grid** — four 280×280 images in the About section with scale/brightness hover effects
- **Responsive typography** — fluid `vw`-based sizing throughout, Inter 300 from Google Fonts
- **Warm gradient active states** — active nav items use a white-to-gold gradient with a soft glow filter
- **Contact icons** — inline SVG icons for Email, LinkedIn, and GitHub with cursor-aware hover behavior
- **Zero dependencies** — Tailwind CSS loaded via CDN only for utility resets; all design is hand-written CSS

---

## Tech Stack

| Layer | Tool |
|---|---|
| Markup | HTML5 |
| Styles | Vanilla CSS + Tailwind CDN (reset only) |
| Logic | Vanilla JavaScript (ES6+) |
| Font | Inter 300/400 — Google Fonts |
| Icons | Inline SVG (Lucide-style paths) |
| Hosting | GitHub Pages |

---

## Project Structure

```
portfolio-project/
├── index.html        # Entire site — markup, styles, and scripts inline
├── images/
│   ├── headshot.jpg
│   ├── brewery.jpg
│   ├── sunset.jpg
│   └── group.jpg
└── README.md
```

---

## Running Locally

No build tools required. Just open the file:

```bash
# Clone the repo
git clone https://github.com/danielfwhite1/portfolio-project.git

# Open in browser
open index.html
```

Or serve it locally to avoid any file:// quirks:

```bash
npx serve .
# → http://localhost:3000
```

---

## Design Decisions

- **Dark background (`#111`)** with white body text and a warm amber accent (`#d4a853`) for interactive states
- **Letter-spacing: -2px** globally for a tight, editorial typographic feel
- **`cursor: none`** with a JavaScript-powered dual-element cursor (dot + lerp-lagged ring) for a premium interaction feel
- **Toggle navigation** — clicking an open section collapses it back to the default state
- **No page reloads** — all state is managed via a single `current` variable and an `innerHTML` render function

---

## Author

**Daniel White**
Software Developer — San Diego, CA

[danielfwhite1@gmail.com](mailto:danielfwhite1@gmail.com) · [LinkedIn](https://linkedin.com/in/danielfwhite/) · [GitHub](https://github.com/danielfwhite1)
