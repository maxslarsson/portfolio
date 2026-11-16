// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  cache: {
    provider: cacheCloudflare()
  }
});
