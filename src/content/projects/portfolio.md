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

The development environment is a Nix flake, so the same Node and pnpm versions are available on any machine with one command.
