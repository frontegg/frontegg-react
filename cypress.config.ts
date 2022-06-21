import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalFetchPolyfill: true,
  experimentalSourceRewriting: true,
  projectId: 'odcj7u',
  viewportHeight: 800,
  viewportWidth: 1440,

  e2e: {
    specPattern: 'packages/**/*.cy-spec.*',
    supportFile: false
  },
});
