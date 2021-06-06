// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port} and also can be run through localhost:${port} from Web Browser`);
});


// GET route which fetches data from API and returns response to my projectData object
/**
 * @description The second parameter which is the function that sends response to the projectData object
 * @param {String-route} '/all'
 * @param {callbackFunction}
 */
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route which saves data fetched from API to my local server(in my projectData object)
/**
 * @description The second parameter which is a function that assigns requests to my server side projectData object
 * @param {String-route} '/sendData'
 * @param {callbackFunction}
 */
app.post('/sendData', (req, res) => {
    projectData.name = req.body.name;
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.send(projectData)
});