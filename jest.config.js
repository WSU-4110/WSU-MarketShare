export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  moduleNameMapper: {
    '^firebase/(.*)$': '<rootDir>/node_modules/firebase/$1',
    '^@/(.*)$': '<rootDir>/$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(firebase|@firebase)/)'
  ],
  rootDir: '.',
  modulePaths: ['<rootDir>']
};