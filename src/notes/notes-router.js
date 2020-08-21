const express = require ('express')
const  xss = require('xss')
const NotesService = require('./notes-service')

const notesRouter = express.Router()
const jsonParser = express.json()

const serializeNotes = note => ({
    id: note.id,
    note_name: note.name,
})

notesRouter
.route('/')
.get((req,res,next) => {
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance)
    .then(notes => {
        // console.log('notes main',notes)
        res.json(notes)
    })
    // .catch(next)
    .catch(err => console.log(err))
})

.post(jsonParser, (req,res,next) => {
    // console.log('body==>',req.body)
    const {user_country_id, note_content} = req.body
    const payload = {
        user_country_id: user_country_id,
        note_content: note_content,
    }
   console.log('payload==>',payload)
    NotesService.insertNote(
        req.app.get('db'),
        payload
    )
    .then(note => {
        res
        .status(201)
        .json(note)
    })
    .catch(next)
})

notesRouter
    .route('/:note_id')
    .all((req,res,next) => {
        if (isNaN(parseInt(req.params.note_id))) {
            return res.status(404).json({
                error: {
                    message: `Invalid id`
                }
            })
        }
        NotesService.getNoteById(
            req.app.get('db'),
            req.params.note_id
        )
        .then(note => {
            if (!note) {
                return res.status(404).json({
                    error: {message: 'Note does not exist'}
                })
            }
            res.note=note
            next()
        })
        .catch(next)
    })
    .get((req,res,next) => {
        res.json(serializeNotes(res.note))
    })

    .patch(jsonParser,(req,res,next) =>{
        const {user_country_id, note_content} = req.body
        const payload = {user_country_id, note_content}
        const numberOfValues = Object.values(payload).filter(Boolean).length
        if (numberOfValues===0)
            return res.status(400).json({
                error: {
                    message:`Request body must contain 'payload'`
                }
            }) 
        NotesService.updateNote(
            req.app.get('db'),
            req.params.note_id,
            payload
        )
        .then(updatedNote =>{
            res.status(200).json(updatedNote[0])
        })
        .catch(next)
    })



module.exports = notesRouter