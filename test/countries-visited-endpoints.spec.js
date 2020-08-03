const knex = require('knex')
const countriesFixtures  = require('./countries.fixtures')
const app = require('../src/app')


describe(' Visited Countries Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('users_countries').truncate())

    afterEach('cleanup', () => db('users_countries').truncate())

    describe(`GET /api/visited`, () => {
        context(`Given no countries`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/visited')
                    .expect(200, [])
            })
        })
        context('Given there are countries in the database', () => {
            const testCountries = countriesFixtures.makeCountriesArray()

            beforeEach('insert countries', () => {
                return db
                    .into('users_countries')
                    .insert(testCountries)
            })

            it('responds with 200 and all of the countries', () => {
                return supertest(app)
                    .get('/api/visited')
                    .expect(200, testCountries)
            })
        })
    

    })

    describe(`GET /api/visited/user/:user_id`, () => {
        context(`Given no users`, () => {
            it(`responds with 404`, () => {
                const userId = 123456
                return supertest(app)
                    .get(`/api/visited/user/${userId}`)
                    .expect(404, { error: { message: `User doesn't exist` } })
            })
        })

        context('Given there are articles in the database', () => {
            const testCountries = countriesFixtures.makeCountriesArray()

            beforeEach('insert user', () => {
                return db
                    .into('users_countries')
                    .insert(testCountries)
            })

            it('responds with 200 and the specified user', () => {
                const userId = 1
                return supertest(app)
                    .get(`/api/visited/user/${userId}`)
                    .expect(200, testCountries)
            })
        })

    })

    

})