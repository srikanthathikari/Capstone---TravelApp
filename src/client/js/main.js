

const planYourTrip = document.getElementById('getStartButton');
const Userform = document.getElementById('userForm');
const doneButton = document.getElementById('Done');
const headerText = document.getElementById('header1Page1');

planYourTrip.addEventListener("click", function (event) {
    planYourTrip.className = "hideButton";
    Userform.className = "UserDetails"
});

function handleSubmit(event) {
    event.preventDefault();
    let nameValue = document.getElementById('name').value;
    let placeValue = document.getElementById('place').value;
    let dateValue = document.getElementById('date').value;
    headerText.textContent = `There you go ${nameValue}`;
    headerText.className = "spacerForHeader"
    Userform.style.display = "none";

    getCoordinates(placeValue).then(function (coordinatesData) {
        callWeatherAPIForFuture('http://localhost:8080/weatherBitAPICall').then((weatherInformation)=>{
            updateUI(weatherInformation,placeValue)
        })
    })
       
}

const getCoordinates = async (placeValue) => {
    const response = await fetch('http://localhost:8080/test', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeValue }),
    });
    try {
        const coordinatesData = await response.json();
        return coordinatesData;
    } catch (error) {
        console.log(error);
    }
}
    
const callWeatherAPIForFuture = async(url) =>{
    const getWeather = await fetch(url);
    try {
        const weatherInformation = await getWeather.json();
        return weatherInformation;
    } catch (error) {
        console.log(error);
    }
}

const updateUI = async(weatherInformation, placeValue) =>{
    // console.log(weatherInformation)
    try{
        document.getElementById('weather').innerHTML = `The weather in ${placeValue} is ${weatherInformation.temp} &#176 C`
        document.getElementById('sunrise').innerHTML = `You can enjoy the sunrise at ${weatherInformation.sunrise}`
    }
    catch(err){

    }
}


