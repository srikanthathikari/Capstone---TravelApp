TRAVEL APP



// What is the idea of project Capstone?

Project Capstone is to implement a travel app that takes in customer name, travel date and location. Based on valid input there would be multiple api calls to fetch weather and images for the request along with the currency used in the country if the country name is entered as a value in the form 

// How to use application?

Enter your name (Optional)
Enter a date (to fetch the weather)
Enter a location of travel
Enter a country of the location to get currency of the country

// API's used 

//Geoname API 

This API is used to get detailed information for the city a search has been performed by giving a name of the place  with query params and get latitude
and longitude.

//Weatherbit API

Weatherbit is used to get current and forecast weather information depending on the longitude and latitude of the given city that was achieved from Geoname API

//Pixabay API

Returns,the images of the given location on the UI.


****Suggestions to Make Project Stand Out*****
Integrated the REST Countries API to pull in data for the country being visited that will display the country's currency and display on the UI.
