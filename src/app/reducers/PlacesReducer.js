export default function reducer(state={
    markers: [],
    newMarkers: []
}, action) {
    switch (action.type) {
        case "RECEIVE_PLACES": {
            return {
                ...state,
                markers: action.payload
            }
        }
        case "POST_PLACES": {
            return {
                ...state,
                newMarkers: []
            }
        }
        case "ADD_PLACE": {
            return {
                ...state,
                newMarkers: [...state.newMarkers, action.payload],

            }
        }
    }
    return state;
}