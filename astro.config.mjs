// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://maxlarsson.dev',

  session: false,
  adapter: cloudflare(),
  cache: {
    provider: cacheCloudflare()
  },

  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()]
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Atkinson Hyperlegible',
      cssVariable: '--font-atkinson',
      weights: [400, 700]
    }
  ]
});
