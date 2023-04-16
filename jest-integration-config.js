const config = require('./jest.config')

const integrationConfig = {
  ...config,
  preset: '@shelf/jest-mongodb',
  testMatch: ['**/*.test.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}

module.exports = integrationConfig
