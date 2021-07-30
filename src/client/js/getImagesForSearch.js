
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

export { getSomeImagesForSearch }