const request = require('supertest')
const server = require('./server')

describe('server.js', () => {

  test('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('endpoint', () => {

    describe('GET /', () => {
      test('should return 200 using async/await', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
      })

      test('should return text/html', async () => {
        const res = await request(server).get('/')
        expect(res.type).toBe('text/html')
      })

    })
  })

})
