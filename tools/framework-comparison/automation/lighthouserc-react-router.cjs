module.exports = {
  ci: {
    collect: {
      startServerCommand: "node ../serve.mjs react",
      startServerReadyPattern: "Muestra react en",
      startServerReadyTimeout: 45000,
      url: [
        "http://127.0.0.1:18821/",
        "http://127.0.0.1:18821/personal",
        "http://127.0.0.1:18821/pelicula/25"
      ],
      numberOfRuns: 3,
      settings: {
        formFactor: "mobile",
        throttlingMethod: "simulate"
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse-results/react-router"
    }
  }
};
