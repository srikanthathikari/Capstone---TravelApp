

import { handleSubmit } from './js/app';
import { getCountryDetails } from './js/getCountryDetails'
import { getSomeImagesForSearch } from './js/getImagesForSearch';
import { getCoordinates } from './js/getCoordinates';
import { callWeatherAPIForFuture } from './js/callWeatherAPI';
import { updateUI } from './js/app';
import '../client/styles/main.scss';


export {
    handleSubmit,
    getSomeImagesForSearch,
    getCoordinates,
    getCountryDetails,
    callWeatherAPIForFuture,
    updateUI
}
