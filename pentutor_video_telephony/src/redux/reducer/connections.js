

import { ADD_NEW_USER_CONNECTION, REMOVE_USER_CONNECTION } from "../ActionTypes/connections"
import { ADD_CONNECTION_MEDIA_STREAM, SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


const initialState = {
    connections: []
}

export const ConnectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_USER_CONNECTION:
            return {
                ...state,
                connections: state.connections.filter(cnt => {
                    if (cnt.user.username != action.payload.user.username) {
                        return cnt
                    }
                })
            }
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