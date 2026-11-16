# Portfolio

Source for [maxlarsson.dev](https://maxlarsson.dev), built with Astro and Tailwind and deployed to Cloudflare.

```sh
nix develop    # optional: shell with Node and pnpm
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # output in dist/
pnpm preview   # serve the build locally
```

Projects are Markdown files in `src/content/projects/`.

## Deploying

Push to GitHub and Cloudflare builds and deploys automatically. Pushes to `main` go to production at [maxlarsson.dev](https://maxlarsson.dev). Pushes to any other branch get a preview URL behind authentication.
