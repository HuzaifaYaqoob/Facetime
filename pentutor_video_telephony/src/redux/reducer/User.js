


import { SET_USER_MEDIA } from "../ActionTypes/UserTypes"

const initialState = {
    profile: {
        first_name: 'Huzaifa',
        last_name: 'Yaqoob'
    },
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
        default:
            return state
    }
}

export default UserReducer