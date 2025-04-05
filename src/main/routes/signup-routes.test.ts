import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/mongo-helper'
import app from '../config/app'
import env from '../config/env'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany({})
  })

  describe('POST /signup', () => {
    it('should return 200 on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Kristen Simpson',
          email: 'kristen.simpson@example.com',
          password: 'pingpong',
          passwordConfirmation: 'pingpong'
        })
        .expect(200)
    })
  })
})
