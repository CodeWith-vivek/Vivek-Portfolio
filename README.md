# Vivek Anand — Portfolio

Personal portfolio site for Vivek Anand, a Full Stack Developer (AI / Generative AI) based in Kochi, Kerala. It is a single-page React app built with Vite and Tailwind CSS. The page has these sections: Hero, About, Tech Stack, Experience, Projects, Education and Contact.

## Features

- **Cursor-tracking hero character.** A pre-rendered WebP frame sequence is drawn on a 2D canvas, and the head turns to follow the mouse (or the finger on touch screens). Each theme has its own frames in `public/frames/dark` and `public/frames/light`, and `public/frames/manifest.json` records which way each frame is looking. On touch devices, frames after the first load only once the visitor touches the screen.
- **Dark / light theme.** The toggle saves the choice in `localStorage`. An inline script in `index.html` applies the saved theme before first paint to avoid a flash. Dark is the default.
- **Smooth scrolling and scroll reveals.** Scrolling uses [Lenis](https://github.com/darkroomengineering/lenis), driven by the GSAP ticker so `ScrollTrigger` animations stay in sync. In-page `#section` links also go through Lenis.
- **Short splash loader.** It covers the web-font swap and hides once fonts are ready, or after 900 ms at most.
- **Project cards.** Projects are split into "featured" and "more" groups. Cards can show a video preview with a sound on/off toggle, and turning sound on for one card mutes the others. Cards also respect `prefers-reduced-motion`.
- **Contact form.** The form uses `react-hook-form` with `zod` validation. It submits via GET into a hidden iframe to a Google Apps Script web app endpoint, which is hardcoded in `src/components/ContactForm.jsx`.
- **Resume download.** The file is served from `public/Vivek_Anand_Resume.pdf`.
- **Content in one file.** Nav items, social links, skills, experience, projects and education all live in `src/constants/index.js`.

## Tech stack

| Area | Used |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 6 with `@vitejs/plugin-react-swc` |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`), plus DM Sans / JetBrains Mono from Google Fonts and local Aeonik fonts |
| Animation | GSAP 3 + `@gsap/react` (ScrollTrigger), Framer Motion, `react-parallax-tilt` |
| Scrolling | Lenis |
| Forms | `react-hook-form`, `zod`, `@hookform/resolvers` |
| Icons / UI | `react-icons`, `react-toastify` |
| Linting | ESLint 9 (flat config), with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` |
| Frame tooling (optional) | Python 3 + OpenCV (`scripts/extract_hero_frames.py`) |

## Folder structure

```
.
├── index.html                  # HTML shell, pre-paint theme script, font + hero-frame preloads
├── vite.config.js              # React SWC + Tailwind plugins, base path config
├── eslint.config.js
├── package.json
├── public/                     # Served as-is (paths are prefixed with the base path at build time)
│   ├── Vivek_Anand_Resume.pdf
│   ├── frames/                 # Hero frame sequence: dark/, light/, manifest.json
│   ├── video/                  # Hero source videos + project preview clip
│   ├── images/                 # Project screenshots, icons, logo, profile
│   ├── assets/logos/           # Tech logos (SVG/PNG)
│   ├── fonts/
│   ├── models/                 # .glb / .fbx 3D models (not referenced by current src/)
│   └── robots.txt
├── scripts/
│   └── extract_hero_frames.py  # Rebuilds public/frames/ from public/video/*.mp4
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Page layout, splash loader, Lenis + GSAP setup
    ├── index.css / App.css
    ├── sections/               # Hero, About, TechStack, Experiences, Projects, Education, Contact
    ├── components/             # Navbar, SideBar, HeroCharacter, ProjectCard, ContactForm, ThemeToggle, ...
    ├── constants/index.js      # All site content/data
    ├── utils/asset.js          # asset(path): prefixes a public path with BASE_URL
    └── assets/                 # Bundled fonts and tech-logo images
```

`image-originals/` and `raw/` are gitignored local backups. You do not need them to build or run the site.

## Prerequisites

- Node.js `^18.0.0 || ^20.0.0 || >=22.0.0` (the range Vite 6 requires)
- npm (the repo includes a `package-lock.json`)
- *(Optional, only to regenerate hero frames)*: Python 3 with `opencv-python-headless` (and NumPy). You can also install [Real-ESRGAN ncnn-vulkan](https://github.com/xinntao/Real-ESRGAN-ncnn-vulkan) for AI upscaling.

## Setup

```bash
git clone https://github.com/CodeWith-vivek/Vivek-Portfolio.git
cd Vivek-Portfolio
npm install
```

## Environment variables

The app itself reads no runtime environment variables, and the repo has no `.env` file. There is one optional build-time variable:

| Name | Read in | Purpose |
| --- | --- | --- |
| `VITE_BASE_PATH` | `vite.config.js` | Public base path for `vite build` and `vite preview`. Defaults to `/Vivek-Portfolio/`, and a trailing slash is added if missing. The dev server always uses `/`. |

`scripts/extract_hero_frames.py` also reads one optional variable:

| Name | Purpose |
| --- | --- |
| `ESRGAN_BIN` | Path to the `realesrgan-ncnn-vulkan` executable. If it is not set, the script falls back to a Lanczos resize plus sharpening. |

## Development

```bash
npm run dev      # Start the Vite dev server (served at /)
npm run lint     # Run ESLint over the project
```

## Build and run

```bash
npm run build    # Production build to dist/, using base /Vivek-Portfolio/ (or VITE_BASE_PATH)
npm run preview  # Serve dist/ locally with the same base path
```

To build for a different path, for example the domain root:

```bash
VITE_BASE_PATH=/ npm run build
```

## Regenerating hero frames (optional)

`public/frames/` is already committed. Only rerun the script if `public/video/characterDark.mp4` or `characterLight.mp4` changes:

```bash
ESRGAN_BIN=/path/to/realesrgan-ncnn-vulkan python scripts/extract_hero_frames.py
python scripts/extract_hero_frames.py --key-only   # only re-bake light-theme transparency
```

The script builds into `public/frames.new/` (gitignored) and swaps it into place when it finishes.

## Tests

There are no automated tests or test script in this project yet. `npm run lint` is the only check.

## Deployment

The repo contains no CI workflow or deploy config. By default, the production build is set up to be served under the `/Vivek-Portfolio/` sub-path, which matches the GitHub repository name. To deploy:

1. Run `npm run build`. Set `VITE_BASE_PATH` first if the site will not be served under `/Vivek-Portfolio/`.
2. Upload the contents of `dist/` to any static host.
