const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4 } = require('uuid');
const PORT = 4444;

const noteTaker = express();

// function to read data from the server
async function getData(){
    const data = await fs.promises.readFile('./Develop/db/db.json', 'utf8');
    return JSON.parse(data);
}

// function for the user to get data from the server
noteTaker.get('/api/data', async (requestObj, responseObj) =>{
    const notes = await getData();
    responseObj.send(notes);
})
noteTaker.listen(PORT, () => {
    console.log('Note Taken started on port', PORT)
})