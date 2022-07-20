


import { GET_USER, LOGIN_USER } from "../ActionTypes/Auth"
import { SET_USER_MEDIA } from "../ActionTypes/UserTypes"

const initialState = {
    profile: undefined,
    is_authenticated: false,
    access_token: undefined,
    stream: {
        screen_share: null,
        video_stream: null,
        audio_stream: null,
    }
}


const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_MEDIA:
            return {
                ...state,
                stream: {
                    ...state.stream,
                    ...action.payload
                }
            }
        case LOGIN_USER:
            return {
                ...state,
                profile: action.payload.data
            }
        case GET_USER:
            return {
                ...state,
                profile: action.payload.data
            }
        default:
            return state
    }
}

export default UserReducer