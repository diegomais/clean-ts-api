const config = require('./jest.config')

const unitConfig = {
  ...config,
  testMatch: ['**/*.spec.ts']
}

module.exports = unitConfig
