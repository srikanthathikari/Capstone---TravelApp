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

export { getCountryDetails }