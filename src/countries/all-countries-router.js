const express = require ('express')
const  xss = require('xss')
const CountriesService = require('./all-countries-service')

const countriesRouter = express.Router()
const jsonParser = express.json()

// const serializeCountries = country => ({
//     id: country.id,
//     country_name: country.name,
// })
countriesRouter
.route('/')
.get((req,res,next) => {
    const knexInstance = req.app.get('db')
    CountriesService.getAllCountries(knexInstance)
    .then(countries => {
        // console.log('countries main',countries)
        res.json(countries)
    })
    // .catch(next)
    .catch(err => console.log(err))
})

// .post(jsonParser, (req,res,next) => {
//     const {name} = req.body
//     const newCountry = {name}

//     for (const [key, value] of Object.entries(newCountry)) {
//         if (value == null) {
//           return res.status(400).json({
//             error: { message: `Missing '${key}' in request body` }
//           })
//         }
//     }    
//     CountriesService.insertCountry(
//         req.app.get('db'),
//         newCountry
//     )
//     .then(country => {
//         res
//         .status(201)
//         //.location(`/countries/${country.id}`)
//         .json(serializeCountries(country))
//     })
//     .catch(next)
// })

countriesRouter
    .route('/:country_id')
    .all((req,res,next) => {
        CountriesService.getCountryById(
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





module.exports = countriesRouter