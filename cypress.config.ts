import { defineConfig } from 'cypress'

export default defineConfig({
  experimentalFetchPolyfill: true,
  experimentalComponentTesting: true,
  experimentalSourceRewriting: true,
  projectId: 'odcj7u',
  viewportHeight: 800,
  viewportWidth: 1440,
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'packages/**/*.cy-spec.*',
  },
})
