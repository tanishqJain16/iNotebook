const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//Route1:getting all notes,login required
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('some error occurred')
    }
})

//route2:adding note,login required
router.post('/addnote', fetchuser, [
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'enter valid desciption').isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savednote = await note.save()
            res.json(savednote)
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send('some error occurred')
        }
    })
//route3:updating a note,login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //create a new note
        const newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
        //checking the user
        var note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('some error occurred')
    }
})
//route4:deleting a note,login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //checking the user
        var note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "note has been deleted", note: note })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('some error occurred')
    }
})
module.exports = router