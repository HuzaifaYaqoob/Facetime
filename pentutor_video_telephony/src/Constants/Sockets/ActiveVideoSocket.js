

import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"
import { store } from "../.."






const onNewMessage = async (e) => {
    const state = store.getState()
    let data = JSON.parse(e.data)
    if (data.type === 'ICE_CANDIDATE' && data.sender.username != state.user.profile.user.username) {
        try {
            state.stream.rtcp_connection.addIceCandidate(data.candidate)
        }
        catch { }
    }
    else if (data.type === 'CUSTOM_OFFER' && data.user.username != state.user.profile.user.username) {
        await state.stream.rtcp_connection.setRemoteDescription(new RTCSessionDescription(data.offer))

        let answer = await state.stream.rtcp_connection.createAnswer()
        await state.stream.rtcp_connection.setLocalDescription(answer)
        let newdata = {
            type: 'CUSTOM_ANSWER',
            message: 'New Answer',
            user: data.user,
            answer: answer
        }
        newdata = JSON.stringify(newdata)
        state.socket.active_video_socket.send(newdata)

    }
    else if (data.type === 'CUSTOM_ANSWER' && data.user.username != state.user.profile.user.username) {
        await state.stream.rtcp_connection.setRemoteDescription(new RTCSessionDescription(data.answer))
    }

}


export const createActiveVideoSocket = (data, success, fail) => {
    let socket = new WebSocket(`${wsBaseURL}${video_websocket_url}${data.video_id}/activated/?token=${Cookies.get('auth_token')}`)

    socket.onopen = () => {
        store.dispatch(
            AddActiveVideoSocket(
                {
                    socket: socket
                }
            )
        )
        success && success()
    }
    socket.onmessage = onNewMessage
}