const BucketListService = {
    getAllBucketList(knex) {
        console.log('whishlist')
        return knex
        .from('users_countries')
        .select('*')
        .where('is_wish_list', 1)
    },

    insertCountry(knex,newCountry) {
        console.log('country=>',newCountry)
        return knex
        .insert(newCountry)
        .into('users_countries')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getCountryById(knex,id) {
        return knex
        .from('users_countries')
        .select('*')
        .where('id',id)
        .first()
    },

    getCountryByUserId(knex,user_id) {
        return knex
        .from('users_countries')
        .select('*')
        .where({'user_id':user_id,"is_wish_list": 1})
    },

}

module.exports = BucketListService