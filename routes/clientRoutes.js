const router = require('express').Router()
const path = require('path');


// Route for the user to get the notes.html file
router.get('/notes', async (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})

// Route for the user to get the index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router