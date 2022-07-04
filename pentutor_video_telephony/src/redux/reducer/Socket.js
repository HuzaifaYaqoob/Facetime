import { ADD_USER_SOCKET, ADD_VIDEO_SOCKET } from "../ActionTypes/SocketTypes"


const initialState = {
    user_socket: null,
    video_socket: null
}

const SocketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_SOCKET:
            return {
                ...state,
                user_socket: action.payload.socket
            }
        case ADD_VIDEO_SOCKET:
            return {
                ...state,
                video_socket: action.payload.socket
            }
        default:
            return state
    }
}

export default SocketReducer