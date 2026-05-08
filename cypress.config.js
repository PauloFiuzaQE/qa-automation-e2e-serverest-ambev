const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "vya8be", // O ID fica aqui, na raiz do objeto
  e2e: {
    baseUrl: 'https://serverest.dev',
    env: {
      frontUrl: 'https://front.serverest.dev'
    },
    video: false,
    setupNodeEvents(on, config) {

      return config;
    },
  },
});