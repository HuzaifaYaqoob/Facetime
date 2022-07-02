import { SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


const initialState = {
    streams: [

    ],
    pinned_stream : null
}

export const StreamReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PINNED_STREAM:
            return {
                ...state,
                pinned_stream : action.payload.stream
            }
        default:
            return state
    }
}