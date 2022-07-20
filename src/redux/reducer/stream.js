import { REQUEST_FULFILLED, SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


const initialState = {
    request_fulfilled: false,
    connected: false,
    permission_denied: false,
    streams: [
        
    ],
    pinned_stream: null,
    rtcp_connection: null,
    remote: {
        stream: new MediaStream()
    }
}

export const StreamReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_REMOTE_STREAM':
            return {
                ...state,
                remote: {
                    ...state.remote,
                    stream: action.payload
                }
            }
        case REQUEST_FULFILLED:
            return {
                ...state,
                request_fulfilled: true
            }

        case SET_PINNED_STREAM:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}