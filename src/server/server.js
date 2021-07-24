const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const { async } = require('regenerator-runtime');
const baseUrl = "http://api.geonames.org/searchJSON?";
const weatherBitApi = "https://api.weatherbit.io/v2.0/current?";
const pixabayApi = "https://pixabay.com/api/?"
const username = "srikanth.athikari"
const countryAPI = "https://restcountries.eu/rest/v2/name/";
const apiKey = "a0b66e8f25824320a59d2ea34eb93175";
const pixabayApikey = "22545256-f4b7dd6452e05a515c6c63567";

const port = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Server is listening');
})

app.use(express.static('dist'))

app.get('/', (req,res)=>{
    res.sendFile('dist/index.html', { root: '.' })
})

/*
A post call to /test end point is happening to get the coordinates of a location that includes latitude and longitude*/

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

//  response from /test endpoint has been formatted and sent to store in coordinates object
let coordinatesData = {};

// A call to weath bit API endpoint and the response is stored in the below object
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

// A call to pixabi API endpoint and the response is sent and displayed directly on the client side
app.post('/getImages', async (req, res) => {
    const locationFromUser = req.body.placeValue;
    const imageCall = await fetch(`${pixabayApi}key=${pixabayApikey}&q=${locationFromUser}`, { method: 'POST' });
    try {
        const imageResponse = await imageCall.json();
        // let imageUrl = imageResponse.hits[0].pageURL;
        // console.log(imageResponse)
        res.send(imageResponse);
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/getCountryDetails', async (req,res) =>{
    const countryValueFromUser = req.body.countryValue;
    const countryCall = await fetch(`${countryAPI}${countryValueFromUser}`, { method: 'GET' });
    try {
        const countryCallResponse = await countryCall.json();

        // let currencyForCountry = countryCallResponse[0].currencies[0].name;
        console.log(countryCallResponse)
        res.send(countryCallResponse);
    }
    catch (err) {
        console.log(err);
    }

})