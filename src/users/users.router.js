const express = require('express')
const  xss = require('xss')
const UsersService = require('./users.service')

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
    id: user.id,
    username: xss(user.username),
    email: xss(user.email),
    password: xss(user.password),
})

usersRouter
.route('/users')
.post(jsonParser, (req,res,next) => {
    const {username, password, email} = req.body
    const newUser = {username, password, email}
    
    for (const [key, value] of Object.entries(newUser))
        if (value == null) 
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
          })
    UsersService.insertUser(
        req.app.get('db'),
        newUser
    )
    .then(user => {
        res
        .status(201)
        .location(`/users/${user.id}`)
        .json(serializeUser(user))
    })
    .catch(next)
})

usersRouter
    .route('/:user_id')
    .all((req,res,next) => {
        UsersService.getUserById(
            req.app.get('db'),
            req.params.user_id
        )
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: {message: 'User does not exist'}
                })
            }
            res.user=user
            next()
        })
        .catch(next)
    })
    .get((req,res,next) => {
        res.json(serializeUser(res.user))
    })



module.exports = usersRouter