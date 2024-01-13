import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [vue(), tailwind()]
});