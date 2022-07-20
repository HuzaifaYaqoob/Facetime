import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import Cookies from 'js-cookie'
import { AddVideoSocket } from "../../redux/actions/socket"
import { RequestFulfilled } from "../../redux/actions/stream"
import { store } from "../.."
import { JoinVideoChatParticipants } from "../VideoChats/VideoChat"
import { VIDEO_MEETING_ACCEPTED_TO_JOIN } from "../../redux/ActionTypes/VideoTypes"
import { PlaySound } from "../Utility/utility"



const handleNewUserRequest = async (message) => {
    PlaySound()
    const state = store.getState()
    let socket = state.socket.active_video_socket

    let user_inp = window.confirm(`${message.sender.username} want to let him In, Do you want?`)
    let data = {
        type: user_inp ? 'CONNECTION_ACCEPTED' : 'CONNECTION_REJECTED',
        message: user_inp ? 'Request Approved' : 'Request Canceled',
        requested: message.sender,
        sender: state.user.profile.user
    }
    socket.send(JSON.stringify(data))
}



const onNewMessage = async (event) => {
    const state = store.getState()
    let data = event.data
    data = JSON.parse(data)

    if (data.type == 'NEW_CONNECTION_REQUEST') {
        handleNewUserRequest(data)
    }
    else if (data.type === 'CONNECTION_ACCEPTED') {
        store.dispatch({
            type: VIDEO_MEETING_ACCEPTED_TO_JOIN,
            payload: true
        })
        JoinVideoChatParticipants(
            { type: 'CAM' },
            () => {
                store.dispatch(
                    RequestFulfilled()
                )
            }
        )
    }
    else if (data.type === 'CONNECTION_REJECTED') {
        store.dispatch({
            type: 'ADD_OR_REMOVE_SNACK_BAR',
            payload: {
                message: 'Host rejected you to join this meeting',
                type: 'info'
            }
        })
        window.location.href = '/'
    }
}

const socketOnClose = () => {
    console.log('Connection Closed')
}



export const createVideoChatUserSocket = (data, success, fail) => {
    let socket = new WebSocket(wsBaseURL + video_websocket_url + data.video_id + `/?token=${Cookies.get('auth_token')}`)

    socket.onopen = (event) => {
        let new_state = store.getState()
        if (new_state.user.profile.user.username == new_state.video.video_chat.host.username) {
            store.dispatch({
                type: VIDEO_MEETING_ACCEPTED_TO_JOIN,
                payload: true
            })
        }
        store.dispatch(
            AddVideoSocket(
                {
                    socket: socket
                }
            )
        )
    }
    socket.onmessage = onNewMessage
    socket.onclose = socketOnClose

}