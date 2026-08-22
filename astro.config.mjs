// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kurssi.pmlo.dev',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()]
  }
});