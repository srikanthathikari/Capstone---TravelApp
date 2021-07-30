
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

export { getCoordinates }