import { ADD_USER_SOCKET, ADD_VIDEO_SOCKET } from "../ActionTypes/SocketTypes"


export const AddVideoSocket = (data, success, fail) => dispatch => {
    dispatch({
        type: ADD_VIDEO_SOCKET,
        payload: {
            socket: data.socket
        }
    })
}


export const AddUserSocket = (data, success, fail) => dispatch => {
    dispatch({
        type: ADD_USER_SOCKET,
        payload: {
            socket: data.socket
        }
    })
}