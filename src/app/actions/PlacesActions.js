import axios from 'axios';

export function getPlaces() {
    return async function (dispatch) {
        await axios.get('http://react-laravel.local/api/places')
            .then((response) => {
                dispatch({type: "RECEIVE_PLACES", payload: response.data});
            })
            .catch((e) => {
                console.log(e);
            });
    };
}
export function postPlaces(newMarkers) {
    return function (dispatch) {
        axios.post('http://react-laravel.local/api/places', newMarkers)
            .then((response) => {
                dispatch({type: "POST_PLACES"})
            })
            .catch((e) => {
                console.log(e);
            })
    }
}
export function addPlace(newMarker) {
    return {
        type: "ADD_PLACE",
        payload: newMarker
    }
}
