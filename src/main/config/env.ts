export default {
  encryptionSaltOrRounds: 12,
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT ?? 3333
}
