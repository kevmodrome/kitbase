import { defineConfig, defaultColors } from 'histoire'
import { HstSvelte } from '@histoire/plugin-svelte'

export default defineConfig({
  setupFile: '/src/histoire.setup.ts',
  plugins: [
    HstSvelte(),
  ],
  theme: {
    title: 'KitBase',
    colors: {
      gray: defaultColors.zinc,
      primary: defaultColors.amber
    }
  }
})