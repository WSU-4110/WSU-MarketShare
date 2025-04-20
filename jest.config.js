module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  transform: {},
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleNameMapper: {
    '^firebase/(.*)$': '<rootDir>/node_modules/firebase/$1'
  }
};