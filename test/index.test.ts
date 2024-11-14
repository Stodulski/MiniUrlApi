import request from 'supertest'
import app from '../src/index'

describe('GET /:shorturl', () => {
  it('Should respond with status 302 if url exist', async () => {
    const response = await request(app).get('/SJGQHY')
    expect(response.status).toBe(302)
  })
  it('Should respond with status 404 if url does not exist', async () => {
    const response = await request(app).get('/RANDOMURL')
    expect(response.status).toBe(404)
  })
})

describe('POST /shorturl', () => {
  it('Should respond with status 201 and message = Ok if short url is sucessfully created', async () => {
    const response = await request(app)
      .post('/shorturl')
      .send({ url: 'www.google.com' })
    expect(response.status).toBe(201)
    expect(response.body.status).toBe('Ok')
  })
  it('Should respond with status 400 and message = Bad if url is invalid', async () => {
    const response = await request(app)
      .post('/shorturl')
      .send({ url: 'Invalid url' })
    expect(response.status).toBe(400)
    expect(response.body.status).toBe('Bad')
  })
})
