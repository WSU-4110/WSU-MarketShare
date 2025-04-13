module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    "/node_modules/(?!firebase)/"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};