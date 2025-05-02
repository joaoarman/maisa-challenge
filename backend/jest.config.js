export default {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  transform: {},
  moduleFileExtensions: ['js'],
  testPathIgnorePatterns: ['/node_modules/']
}; 