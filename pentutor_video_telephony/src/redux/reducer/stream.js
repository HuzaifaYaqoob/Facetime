import { SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


const initialState = {
    request_fulfilled : false,
    connected : false,
    permission_denied : false,
    streams: [

    ],
    pinned_stream: null
}

export const StreamReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PINNED_STREAM:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}