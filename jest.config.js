module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: [],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-svg-transformer",
	"\\.(css|less|scss)$": "identity-obj-proxy",
  }
}