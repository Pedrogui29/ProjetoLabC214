module.exports = {
  testEnvironment: 'jsdom',
  "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        outputPath: "./testreports/test-report.html",
        pageTitle: "Test Report",
      },
    ],
  ],
};
