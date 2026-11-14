module.exports = {
  ci: {
    collect: {
      startServerCommand: "node ../serve.mjs sveltekit",
      startServerReadyPattern: "Muestra sveltekit en",
      startServerReadyTimeout: 45000,
      url: [
        "http://127.0.0.1:18820/",
        "http://127.0.0.1:18820/personal",
        "http://127.0.0.1:18820/pelicula/25"
      ],
      numberOfRuns: 3,
      settings: {
        formFactor: "mobile",
        throttlingMethod: "simulate"
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse-results/sveltekit"
    }
  }
};
