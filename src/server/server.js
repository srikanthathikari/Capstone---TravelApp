const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const baseUrl = "http://api.geonames.org/searchJSON?";
const weatherBitApi = "https://api.weatherbit.io/v2.0/current?";
const username = "srikanth.athikari"
const apiKey = "a0b66e8f25824320a59d2ea34eb93175";

const port = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Server is listening');
})

app.post('/test', async (req, res) => {
    const locationFromUser = req.body.placeValue;
    const apiCall = await fetch(`${baseUrl}q=${locationFromUser}&maxRows=1&username=${username}`, { method: 'POST' });
    try {
        const data = await apiCall.json();
        res.send(data);
        coordinatesData = data;
    } catch (error) {
        console.log("error", error)
    }
})

let coordinatesData = {};

let weatherInformation = {};

app.get('/weatherBitAPICall', async (req, res) => {
    let latitude = coordinatesData.geonames[0].lat;
    let longitude = coordinatesData.geonames[0].lng;
    const weatherCall = await fetch(`${weatherBitApi}lat=${latitude}&lon=${longitude}&key=${apiKey}`, { method: 'POST' });
    try {
        const weatherResponse = await weatherCall.json();
        weatherInformation.temp = weatherResponse.data[0].temp;
        weatherInformation.sunrise = weatherResponse.data[0].sunrise;
        res.send(weatherInformation);
    }
    catch (error) {
        console.log("error", error)
    }
})