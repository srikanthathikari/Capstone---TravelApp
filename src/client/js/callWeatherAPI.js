const callWeatherAPIForFuture = async (url) => {
    const getWeather = await fetch(url);
    try {
        const weatherInformation = await getWeather.json();
        return weatherInformation;
    } catch (error) {
        console.log(error);
    }
}

export {callWeatherAPIForFuture}