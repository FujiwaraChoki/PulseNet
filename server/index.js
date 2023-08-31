const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    // Send the index.html in assets folder (which is in the parent directory)
    res.sendFile(path.join(__dirname, '../assets/index.html'));
});

app.post('/data', bodyParser.json(), (req, res) => {
    // Get the data from the request body
    const data = req.body;
    // Log the data to the console
    console.log(data);
    // Append the data to the data.json file
    fs.appendFile(path.join(__dirname, '../assets/data.json'), `${JSON.stringify(data)}\n`, (err) => {
        if (err) {
            console.log(err);
        }
    });
    // Send a response
    res.send('ok');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});