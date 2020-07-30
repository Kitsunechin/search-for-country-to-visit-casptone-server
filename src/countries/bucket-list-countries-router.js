const express = require ('express')
const  xss = require('xss')
const bucketListService = require('./bucket-list-countries-service')

const bucketListRouter = express.Router()
const jsonParser = express.json()

const serializeCountries = country => ({
    id: country.id,
    country_name: country.name,
})

bucketListRouter
.route('/')
.get((req,res,next) => {
    const knexInstance = req.app.get('db')
    // console.log('bucket-list',knexInstance)
    bucketListService.getAllBucketList(knexInstance)
    .then(countries => {
        console.log('bucket',countries)
        if(countries.length == 0) {
            return res.status(404).json({
                error: { message: `No bucket-list countries for this user` }
              })  
        }
        else {
            res.status(200).json(countries)
        }
    })
    .catch(next)
    
})

.post(jsonParser, (req,res,next) => {
    
    const {id, nicename, user_id} = req.body
    const payload = {
        user_id:user_id,
        country_id:id,
        nicename:nicename,
        is_visited:0,
        is_wish_list:1
    }
   
    bucketListService.insertCountry(
        req.app.get('db'),
        payload
    )
    .then(country => {
        console.log('country.id==>',country)
        res
        .status(201)
        .json(country)
    })
    .catch(next)
})

bucketListRouter
    .route('/:country_id')
    .all((req,res,next) => {
        bucketListService.getCountryById(
            req.app.get('db'),
            req.params.country_id
        )
        .then(country => {
            if (!country) {
                return res.status(404).json({
                    error: {message: 'Country does not exist'}
                })
            }
            res.country=country
            next()
        })
        .catch(next)
    })
    .get((req,res,next) => {
        res.json(serializeCountries(res.country))
    })

bucketListRouter
    .route('/user/:user_id')
    .all((req,res,next) => {
        bucketListService.getCountryByUserId(
            req.app.get('db'),
            req.params.user_id
        )
        .then(country => {
            if (!country) {
                return res.status(404).json({
                    error: {message: 'Country does not exist'}
                })
            }
            res.country=country
            next()
        })
        .catch(next)
    })
    .get((req,res,next) => {
        res.json(res.country)
    })




module.exports = bucketListRouter