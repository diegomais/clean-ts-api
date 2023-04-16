/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
