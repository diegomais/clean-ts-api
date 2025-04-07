module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '8.0.5',
      skipMD5: true
    },
    autoStart: false
  }
}
