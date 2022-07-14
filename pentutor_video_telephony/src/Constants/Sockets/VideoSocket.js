import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import Cookies from 'js-cookie'
import { AddVideoSocket } from "../../redux/actions/socket"
import { RequestFulfilled } from "../../redux/actions/stream"
import { store } from "../.."
import { createUserConnection } from "../Connections/userConnections"



const handleNewUserRequest = async (message) => {
    console.log(message)
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


const joinVideoChat = async (data, success, fail) => {
    const state = store.getState()
    state.video.video_chat.paticipants.map(prtcpnt => {
        console.log(prtcpnt)
    })
    let my_connection = createUserConnection({ user: state.video.video_chat.host })

    let vid_stream = state.user.stream.video_stream
    let aud_stream = state.user.stream.audio_stream

    vid_stream.getVideoTracks(trck => {
        my_connection.addTrack(trck, vid_stream)
    })
    aud_stream.getAudioTracks(trck => {
        my_connection.addTrack(trck, aud_stream)
    })

    let offer = await my_connection.createOffer()
    await my_connection.setLocalDescription(offer)

    let join_data = {
        type: 'NEW_USER_JOINED_VIDEO_CHAT',
        sender: state.user.profile.user,
        offer: my_connection.localDescription,
        connection_for : {}
    }
    state.socket.active_video_socket.send(JSON.stringify(join_data))
    success && success()
}

const onNewMessage = async (event) => {
    const state = store.getState()
    let data = event.data
    data = JSON.parse(data)

    if (data.type == 'NEW_CONNECTION_REQUEST') {
        handleNewUserRequest(data)
    }
    else if (data.type === 'CONNECTION_ACCEPTED') {
        joinVideoChat(
            {},
            () => {
                store.dispatch(
                    RequestFulfilled()
                )
            }
        )
    }
    else if (data.type === 'CONNECTION_REJECTED') {
        alert('You are not allowed')
        window.location.href = '/'
    }
    else if (data.type === 'ICE_CANDIDATE') {
        try {
            state.stream.rtcp_connection.addIceCandidate(data.candidate)
        }
        catch { }
    }
}

const socketOnClose = () => {
    console.log('Connection Closed')
}



export const createVideoChatUserSocket = (data, success, fail) => {
    let socket = new WebSocket(wsBaseURL + video_websocket_url + data.video_id + `/?token=${Cookies.get('auth_token')}`)

    socket.onopen = (event) => {
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