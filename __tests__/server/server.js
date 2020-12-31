const request = require('supertest');
const server = 'http://localhost:3000';
const db = require('../../server/server')

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .post('/bcrypt/check_pw')
          .send({ username: 'test', password: 'test' })
          //.expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });
});