

import { ADD_NEW_USER_CONNECTION } from "../ActionTypes/connections"
import { ADD_CONNECTION_MEDIA_STREAM, ADD_RTCP_CONNECTION, REQUEST_FULFILLED, SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


const initialState = {
    connections: []
}

export const ConnectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONNECTION_MEDIA_STREAM:
            return {
                ...state,
                connections: state.connections.map(cnct => {
                    if (cnct.user.username == action.payload.user.username) {
                        return {
                            ...cnct,
                            stream: action.payload.stream
                        }
                    }
                    return cnct
                })
            }
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