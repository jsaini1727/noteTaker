const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4 } = require('uuid');
const { request } = require('http');
const PORT = 4444;

const noteTaker = express();

// function to read data from the server
async function getData(){
    const data = await fs.promises.readFile('./Develop/db/db.json', 'utf8');
    return JSON.parse(data);
}

// function to write data into the server
async function saveUserNote(noteArr){
    await fs.promises.writeFile('./Develop/db/db.json', JSON.stringify(noteArr, null, 2));
    console.log('User Notepad Updated');
}

// Opening up the middleware channel to allow json to be sent through from the user
noteTaker.use(express.json());


// Route for the user to get data from the server
noteTaker.get('/api/data', async (requestObj, responseObj) =>{
    const notes = await getData();
    responseObj.send(notes);
})

// Route to add a note to the json database
noteTaker.post('/api/data', async(requestObj, responseObj) => {
    const notes = await getData();
    const addNote = requestObj.body;

    addNote.id = v4();

    notes.push(requestObj.body);

    await saveUserNote(notes);
    
    return responseObj.send({
        message: 'Note added successfully'
    });
})

// Root route
noteTaker.get('/', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './Develop/public/index.html'))
})


// initiating the server 
noteTaker.listen(PORT, () => {
    console.log('Note Taken started on port', PORT)
})