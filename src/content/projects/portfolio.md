---
title: "Portfolio"
summary: "This site: a small static Astro site deployed to Cloudflare."
date: 2026-10-21
tags:
  - Astro
  - Tailwind
  - Cloudflare
demoUrl: https://maxlarsson.dev
repoUrl: https://github.com/maxslarsson/portfolio
---

This is the site you are reading. I wanted somewhere to write about projects at more length than a resume bullet allows, and I wanted it to load fast and stay easy to change.

It is built with [Astro](https://astro.build) and styled with Tailwind. Every page is rendered to static HTML at build time and served from Cloudflare. Each project is a Markdown file in a content collection with a typed schema, which means adding one is a matter of writing a file and committing it. Images are resized and converted to WebP during the build.

The development environment is a Nix flake, so the same tools are available on any machine with one command. The flake does not pick versions itself. It reads the Node version from `.node-version`, and pnpm switches itself to the version in the `packageManager` field of `package.json`. CI reads the same two places, so there is one source of truth for each version and changing it changes it everywhere at once.

CI is a GitHub Actions workflow that runs on every pull request and every push to `main`. It installs all dependencies from the lockfile, type-checks the entire site, and runs a full build.

Dependencies are kept current by [Renovate](https://docs.renovatebot.com). Minor and patch updates are proposed once they have been out for a week, and merged automatically as soon as CI passes. Security fixes skip the wait. When a vulnerability alert comes in, the fix is proposed right away and merged as soon as CI passes. Major versions always wait for me.
