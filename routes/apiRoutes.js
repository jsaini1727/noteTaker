const router = require('express').Router()
const fs = require('fs');
const { v4 } = require('uuid');
const db = require('../db/db.json')

// Route to get notes from the server
router.get('/notes', (req, res) => {
    res.json(db)
});

// Route for the user to add to the notes on the server 
router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    const newNoteObj = {
        title, text, id: v4()
    }

    db.push(newNoteObj)

    fs.writeFile('./db/db.json', JSON.stringify(db), (err, result) => {
        if (err) throw err;

    })
    res.json('note added')
    return;
});

// Route to delete a note from the server with an ID
router.delete('/notes/:id', async (req, res) => {
    const filteredNotes = await db.filter((note) => req.params.id !== note.id)

    fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
        if (err) throw err;
        console.log('Note has been deleted', filteredNotes);
    })
   
    return filteredNotes;
  
});



module.exports = router