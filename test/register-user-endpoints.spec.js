const knex = require('knex')
const app = require('../src/app')


describe('Register User Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('users').truncate())

    afterEach('cleanup', () => db('users').truncate())

    describe(`POST /api/users`, () => {
        it(`creates a user, responding with 201 and the new user`, function () {
            this.retries(3)
            const newUser = {
                id: 1,
                user_name: 'admin',
                user_password: 123,
                user_email: 'admin@gmail.com',
            }
            return supertest(app)
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect(res => {
                    expect(res.body.id).to.have.property('id')
                    expect(res.body.user_name).to.eql(newUser.user_name)
                    expect(res.body.user_password).to.eql(newUser.user_password)
                    expect(res.body.user_email).to.eql(newUser.user_email)
                    expect(actual).to.eql(expected)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/users${res.body.id}`)
                        .expect(res.body)
                )
        })

        const requiredFields = ['user_name', 'user_password', 'user_email']

        requiredFields.forEach(field => {
            const newUser = {
                id: 1,
                user_name: 'admin',
                user_password: 123,
                user_email: 'admin@gmail.com',
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newUser[field]

                return supertest(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    })
})