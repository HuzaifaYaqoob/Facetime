

import { ADD_NEW_USER_CONNECTION } from "../ActionTypes/connections"
import { ADD_RTCP_CONNECTION, REQUEST_FULFILLED, SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


const initialState = {
    connections: []
}

export const ConnectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_USER_CONNECTION:
            return {
                ...state,
                connections: [
                    ...state.connections,
                    action.payload.connection
                ]
            }
        default:
            return state
    }
}