module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testMatch: [
    '<rootDir>/__tests__/**/*.test.js',
    '<rootDir>/**/*.test.js',
  ],
  collectCoverageFrom: [
    'routes/**/*.js',
    'models/**/*.js',
    'configs/**/*.js',
    '!__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};