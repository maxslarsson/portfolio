// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://maxlarsson.dev',

  session: false,
  adapter: cloudflare(),

  cache: {
    provider: cacheCloudflare()
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Atkinson Hyperlegible',
      cssVariable: '--font-atkinson',
      weights: [400, 700]
    }
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
