const CountriesService = {
    getAllCountries(knex) {
        return knex
        .from('countries')
        .select('*')
    },

    getCountryById(knex,id) {
        return knex
        .from('countries')
        .select('*')
        .where('id',id)
        .first()
    },

}

module.exports = CountriesService