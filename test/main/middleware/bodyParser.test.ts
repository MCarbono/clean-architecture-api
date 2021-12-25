import request from 'supertest'
import app from '@/main/config/app'

describe('Body parser middleware', () => {
    test('should parse bodty as JSON', async () => {
        app.post('/test_body_parser', (req,res) => {
            res.send(req.body)
        })

        await request(app)
            .post('/test_body_parser')
            .send({ name: 'teste' })
            .expect({ name: 'teste' })
    })
})