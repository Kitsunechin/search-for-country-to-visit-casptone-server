const VisitedCountriesService = {
    getAllVisitedCountries(knex) {
        return knex
        .from('users_countries')
        .select('*')
        .where('is_visited', 1)
    },

    insertCountry(knex,newCountry) {
        return knex
        .insert(newCountry)
        .into('users_countries')
        .returning('*')
        .then(rows => {
            return(rows[0])
        })
    },
    getCountryById(knex,id) {
        return knex
        .from('users_countries')
        .select('*')
        .where('id',id)
        .first()
    },

}
module.exports = VisitedCountriesService