const express = require('express');
const request = require('request');
const app = express();
const port = 3000;
//const url = 'https://api.n2yo.com/rest/v1/satellite/tle/25544&apiKey=DW59JW-VF3CNQ-FBYJZS-4ZZQ';

// server sends public folder to frontend to render
app.use(express.static('public'));

/*app.get('/', (req, res) => {
    console.log(__dirname);
});*/

// todo: add parameter to url to change satellite id
app.get('/satellite', async (req, res) => {
    // get satellite data from api and send back as json
    request('https://api.n2yo.com/rest/v1/satellite/tle/25544&apiKey=DW59JW-VF3CNQ-FBYJZS-4ZZQ', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = body;
            res.json(data);
        }
    })
});

// todo: add parameter to url to change radius
app.get('/above', async (req, res) => {
    //get what satellites are above you in this very moment
    request('https://api.n2yo.com/rest/v1/satellite/above/47.143/8.432/429/60/0&apiKey=DW59JW-VF3CNQ-FBYJZS-4ZZQ', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = body;
            res.json(data);
        }
    })
})

app.listen(port, () => console.log(`Server is listening to ${port} :)`))