const express = require ('express')
const  xss = require('xss')
const bucketListService = require('./bucket-list-countries-service')

const bucketListRouter = express.Router()
const jsonParser = express.json()

// const serializeCountries = country => ({
//     id: country.id,
//     country_name: country.name,
// })

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
    // .catch(next)
    .catch(err => console.log(err))
})

.post(jsonParser, (req,res,next) => {
    const {name} = req.body
    const newCountry = {name}

    for (const [key, value] of Object.entries(newCountry)) {
        if (value == null) {
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
          })
        }
    }    
    bucketListService.insertCountry(
        req.app.get('db'),
        newCountry
    )
    .then(country => {
        res
        .status(201)
        //.location(`/bucket/${country.id}`)
        // .json(serializeCountries(country))
        .json(countries)
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





module.exports = bucketListRouter