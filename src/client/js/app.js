
import "regenerator-runtime/runtime";
import {getCoordinates} from '../js/getCoordinates';

const planYourTrip = document.getElementById('getStartButton');
const Userform = document.getElementById('userForm');
const doneButton = document.getElementById('Done');
const headerText = document.getElementById('header1Page1');

/*Plan your trip has an event listener, upon click on "Plan Your Trip" button the form would be displayed
in the same page hiding existing text button and displaying form
*/
window.onload = () => {
    planYourTrip.addEventListener("click", function (event) {
        planYourTrip.className = "hideButton";
        Userform.className = "UserDetails"
    });
}

/* 
 handleSubmit is the function that listen's to the event on filling the form
 After the click there would be a call to geoname API to get coordinates(latitude and longitude),
 On the reponse the next call would be happening to weatherBit API to get the weather details for the details that has entered by the user
 Once we have both of those another final API call would be made to get a image for the location that the user has entered
*/
function handleSubmit(event) {
    event.preventDefault();
    let nameValue = document.getElementById('name').value;
    let placeValue = document.getElementById('place').value;
    let countryValue = document.getElementById('country').value;
    let dateValue = document.getElementById('date').value;
    headerText.textContent = `Best results just for you ${nameValue}`;
    headerText.className = "spacerForHeader"
    Userform.style.display = "none";

    getCoordinates(placeValue).then(function (coordinatesData) {
        callWeatherAPIForFuture('http://localhost:8080/weatherBitAPICall').then((weatherInformation) => {
            getCountryDetails('http://localhost:8080/getCountryDetails', countryValue).then((currencyData) => {
                getSomeImagesForSearch('http://localhost:8080/getImages', placeValue).then((imageData) => {
                    let image = imageData.hits[0].webformatURL
                    updateUI(weatherInformation, placeValue, image,currencyData,countryValue)
                })
            })
        })
    })
}

const getCountryDetails = async (url, countryValue) => {
    const currency = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ countryValue }),
    })
    try {
        const currencyData = await currency.json();
        return currencyData[0].currencies[0].name;
    }
    catch (err) {
        console.log(err);
    }
}

const getSomeImagesForSearch = async (url, placeValue) => {
    const images = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeValue }),
    });
    try {
        const imageData = await images.json();
        return imageData;
    }
    catch (err) {
        console.log(err);
    }
}

const callWeatherAPIForFuture = async (url) => {
    const getWeather = await fetch(url);
    try {
        const weatherInformation = await getWeather.json();
        return weatherInformation;
    } catch (error) {
        console.log(error);
    }
}

/*
Upon fetching all the API details a weather forecast for the location and an image would be updated with the below function dynamically
*/
const updateUI = async (weatherInformation, placeValue, imageData,currencyData,countryValue) => {
    console.log(currencyData)
    try {
        document.getElementById('weather').innerHTML = `The weather in ${placeValue} is ${weatherInformation.temp} &#176 C`;
        document.getElementById('sunrise').innerHTML = `You can enjoy the sunrise at ${weatherInformation.sunrise}`;
        document.getElementById('imageForLocation').src = imageData;
        document.getElementById('currency').innerHTML = `The currency in the ${countryValue} is ${currencyData}`
    }
    catch (err) {
        console.log(err)

    }
}


// These functions would be exported and imported in the index.js file

export { handleSubmit }
export { getSomeImagesForSearch }
export { callWeatherAPIForFuture }
export { updateUI }



