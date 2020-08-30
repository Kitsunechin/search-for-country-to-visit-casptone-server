const express = require ('express');
const  xss = require('xss');
const VisitedCountriesService = require('./visited-countries-service');

const visitedCountriesRouter = express.Router();
const jsonParser = express.json();

const serializeCountries = country => ({
    id: country.id,
    country_name: country.name,
});

visitedCountriesRouter
.route('/')
.get((req,res,next) => {
    const knexInstance = req.app.get('db')
    VisitedCountriesService.getAllVisitedCountries(knexInstance)
    .then(countries => {
        console.log('visited', countries)
        if(countries.length == 0) {
            return res.status(404).json({
                error: { message: `No visited countries for this user` }
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
        is_visited:1,
        is_wish_list:0
    }
    VisitedCountriesService.insertCountry(
        req.app.get('db'),
        payload
    )
    .then(country => {
        res
        .status(201)
        .json(country)
    })
    .catch(next)
})

visitedCountriesRouter
    .route('/:country_id')
    .all((req,res,next) => {
        VisitedCountriesService.getCountryById(
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
    });


visitedCountriesRouter
    .route('/user/:user_id')
    .all((req,res,next) => {
        VisitedCountriesService.getCountryByUserId(
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
    });





module.exports = visitedCountriesRouter