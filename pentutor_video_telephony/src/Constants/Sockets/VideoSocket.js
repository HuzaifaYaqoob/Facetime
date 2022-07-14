import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import Cookies from 'js-cookie'
import { AddVideoSocket } from "../../redux/actions/socket"
import { RequestFulfilled } from "../../redux/actions/stream"
import { store } from "../.."



const handleNewUserRequest = async (message) => {
    console.log(message)
    const state = store.getState()
    let socket = state.socket.video_socket

    let user_inp = window.confirm(`${message.sender.username} want to let him In, Do you want?`)
    let data = {}
    if (user_inp) {

        await state.stream.rtcp_connection.setRemoteDescription(new RTCSessionDescription(message.offer))

        state.user.stream.video_stream.getVideoTracks().forEach(tr => {
            state.stream.rtcp_connection.addTrack(tr, state.user.stream.video_stream)
        })
        state.user.stream.audio_stream.getAudioTracks().forEach(tr => {
            state.stream.rtcp_connection.addTrack(tr, state.user.stream.audio_stream)
        })


        let answer = await state.stream.rtcp_connection.createAnswer()
        await state.stream.rtcp_connection.setLocalDescription(answer)

        data = {
            type: 'CONNECTION_ACCEPTED',
            message: 'Request Approved',
            requested: message.sender,
            answer: answer,
            sender: state.user.profile.user
        }
    }
    else {
        data = {
            type: 'CONNECTION_REJECTED',
            message: 'Request Canceled',
            requested: message.sender,
            sender: state.user.profile.user
        }
    }

    data = JSON.stringify(data)
    socket.send(data)
}


const onNewMessage = async (event) => {
    const state = store.getState()
    let data = event.data
    data = JSON.parse(data)

    if (data.type == 'NEW_CONNECTION_REQUEST') {
        handleNewUserRequest(data)
    }
    else if (data.type === 'CONNECTION_ACCEPTED') {
        await state.stream.rtcp_connection.setRemoteDescription(new RTCSessionDescription(data.answer))
        store.dispatch(
            RequestFulfilled()
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