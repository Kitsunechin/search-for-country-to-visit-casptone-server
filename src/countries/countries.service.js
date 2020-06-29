const CountriesService = {
    getAllCountries(knex) {
        return knex
        .from('countries')
        .select('countries.id',
                'countries.name')
        },

    insertCountry(knex,newCountry) {
        return knex
        .insert(newCountry)
        .into('countries')
        .returning('*')
        .then(rows => {
            return(rows[0])
        })
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