const UsersService = {
    getAllCountries(knex) {
        return knex
        .from('users')
        .select('users_name',
                'user_password',
                'user_email')
        },

    insertUser(knex,newUser) {
        return knex
        .insert(newUser)
        .into('users')
        .returning('*')
        .then(rows => {
            return(rows[0])
        })
    },
    getUserById(knex,id) {
        return knex
        .from('users')
        .select('*')
        .where('id',id)
        .first()
    },

}

module.exports = UsersService