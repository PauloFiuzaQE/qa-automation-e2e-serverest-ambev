const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    env: {
      frontUrl: 'https://front.serverest.dev'
    },
    video: false,
    setupNodeEvents(on, config) {

    },
  },
});