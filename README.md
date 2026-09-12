# Dilep Kumar K — portfolio

A React / Vinext portfolio with a graphite and orange visual theme, letter-by-letter title and portrait entrances, native scrolling, warm moving spotlights, a canvas network with a glowing orbit trail, pointer-reactive cards, and scroll reveals. Content and project links are grounded in the supplied resume.

## Local development

Use Node 22 (see `.nvmrc`). Node 24 on this Windows machine completes the static export but fails during shutdown with a libuv assertion; Node 22 builds successfully.

```sh
npm run dev
```

## Build for GitHub Pages

```sh
npm run build
node scripts/prepare-pages.mjs
```

The second command validates asset references and updates `docs/`, mapping the `/portfolio/` asset prefix to the correct GitHub Pages directory. It does not publish or push changes. If the active Node version is 24, run the build with `npm exec --yes --package=node@22 -- node node_modules/vinext/dist/cli.js build`.

## Motion and access

- Device reduced-motion settings disable animation automatically.
- The fixed motion button pauses animation and pointer depth. Scroll progress updates only its own transform; scroll handlers do not read layout or update inherited style variables.
- The canvas pauses while scrolling, when offscreen, or when the browser tab is hidden; rendering is capped at approximately 30 fps. Its trail uses three batched strokes without per-segment blur. Decorative CSS animations pause offscreen.
- Content is rendered as HTML and remains readable without JavaScript.
- Navigation supports keyboard focus, a skip link, and a mobile menu.

## Reference direction

The supplied first video informed portrait depth and restrained transitions. The second video and https://github.com/gireeshkumarreddy/cinematic-portofilo informed oversized lettering, warm light, and timed entrances. No reference footage or source implementation was copied.

The supplied technologies PDF is a design reference, not a list of libraries this portfolio claims to use. Motion here uses CSS and a small React canvas component; no GSAP or 3D-model dependency was needed.

## Verification

Production export succeeds under Node 22. TypeScript validation passes. The Pages preparation script checks local links, images, scripts, and stylesheets. Browser interaction and visual testing have not been performed.
