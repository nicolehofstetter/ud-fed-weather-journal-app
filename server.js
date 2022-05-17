// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const server = app.listen(port, listening);

function listening() {
    console.log('Server is running');
}

app.get('/api/user-entry', function (req, res) {
    res.send(projectData);
});

app.post('/api/user-entry', function (req, res) {
    let body = req.body;
    projectData = {
        temperature: body.temperature,
        date: body.date,
        userResponse: body.userResponse,
    };
});