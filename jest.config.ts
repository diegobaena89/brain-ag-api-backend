// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverageFrom: ["src/app/services/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testMatch: ["**/__tests__/**/*.spec.(ts|js)"],
  coverageTrheshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
