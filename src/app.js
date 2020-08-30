require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const countriesRouter = require('./countries/all-countries-router')
const visitedCountriesRouter = require('./countries/visited-countries-router')
const bucketListRouter = require('./countries/bucket-list-countries-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const notesRouter = require('./notes/notes-router')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());


app.use('/api/all', countriesRouter);
app.use('/api/visited', visitedCountriesRouter);
app.use('/api/bucket-list', bucketListRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);


app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// 4 parameters in middleware, express knows to treat this as error handler
app.use((error, req, res, next) => {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' }}
    } else {
      response = { error }
    }
    res.status(500).json(response)
  })

module.exports = app