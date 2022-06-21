import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalFetchPolyfill: true,
  experimentalSourceRewriting: true,
  projectId: 'odcj7u',
  viewportHeight: 800,
  viewportWidth: 1440,

  component: {
    specPattern: 'packages/**/*.cy-spec.*',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
