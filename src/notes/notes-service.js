const NotesService = {
    getAllNotes(knex) {
        return knex
        .from('users_notes')
        .select('*')
    },

    insertNote(knex,newNote) {
        return knex
        .insert(newNote)
        .into('users_notes')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },

    getNoteById(knex,id) {
        return knex
        .from('users_notes')
        .select('*')
        .where('id',id)
        .first()
    },

    updateNote(knex, id, newNote) {
        return knex('users_notes')
        .where({id})
        .update(newNote, returning=true)
        .returning('*')
    }

}

module.exports = NotesService