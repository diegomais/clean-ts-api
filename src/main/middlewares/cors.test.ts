import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  it('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('Access-Control-Allow-Origin', '*')
  })
})
