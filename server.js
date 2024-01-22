const express = require('express');
const clientRoutes = require('./routes/clientRoutes')
const apiRoutes = require('./routes/apiRoutes')

const PORT = 4444;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api', apiRoutes)
app.use('/', clientRoutes)

app.listen(PORT, () => {
    console.log('Note Taken started on port', PORT)
})
