module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(firebase|@firebase)/)'
  ],
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleNameMapper: {
    '^firebase/(.*)$': '<rootDir>/node_modules/firebase/$1',
    '^@/(.*)$': '<rootDir>/$1'  // This allows imports from project root
  },
  rootDir: '.',  // Set the root directory for Jest
  modulePaths: ['<rootDir>']  // Add root directory to module search paths
};