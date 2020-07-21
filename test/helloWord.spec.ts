import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure route home works', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .get('/')
      .expect(200)

    assert.exists(body)
  })
})
