

import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"
import { store } from "../.."
import { createUserConnection } from "../Connections/userConnections"
import { AddAnswerVideoChat, AddVideoChatParticipant } from "../VideoChats/VideoChat"






const onNewMessage = async (e) => {
    const state = store.getState()
    let data = JSON.parse(e.data)
    if (data.type === 'ICE_CANDIDATE' && data.sender.username != state.user.profile.user.username) {
        let connection = store.getState().connection.connections.find(cnt => cnt.user.username == data.sender.username)
        if (connection && connection.rtcp) {
            try {
                connection.rtcp.addIceCandidate(data.candidate)
            }
            catch { }
        }
        else{
        }
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

    else if (data.type === 'NEW_USER_JOINED_VIDEO_CHAT' && data.sender.username != state.user.profile.user.username && data.connection_for.username == state.user.profile.user.username) {
        AddVideoChatParticipant(
            {
                user: data.sender,
                offer: data.offer
            }
        )
    }

    else if (data.type === 'NEW_USER_JOINED_VIDEO_CHAT_APPROVED' && data.answer_for.username == state.user.profile.user.username) {
        AddAnswerVideoChat(
            {
                user: data.sender,
                answer: data.answer
            }
        )
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