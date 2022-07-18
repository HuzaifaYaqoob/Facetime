

import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"
import { store } from "../.."
import { AddAnswerVideoChat, AddVideoChatParticipant } from "../VideoChats/VideoChat"
import { REMOVE_USER_CONNECTION } from "../../redux/ActionTypes/connections"
import { CHAT_NEW_MESSAGE } from "../../redux/ActionTypes/Chat"
import { add_new_screen_share_connection, screen_share_response_answer } from "../Connections/screenShareCon"


const onNewMessage = async (e) => {
    const state = store.getState()
    let data = JSON.parse(e.data)
    if (!store.getState().video.video_chat_joined) {
        return
    }
    if (data.type === 'ICE_CANDIDATE' && data.sender.username != state.user.profile.user.username) {
        let connection = store.getState().connection.connections.find(cnt =>
        (cnt.user.username == data.sender.username,
            cnt.user.type == 'CAM')
        )
        if (connection && connection.rtcp) {
            try {
                connection.rtcp.addIceCandidate(data.candidate)
            }
            catch { }
        }
        else {
        }
    }
    else if (data.type === 'SCREEN_ICE_CANDIDATE' && data.sender.username != state.user.profile.user.username) {
        let connection = store.getState().connection.connections.find(cnt =>
        (cnt.user.username == data.sender.username,
            cnt.user.type == 'SCREEN')
        )
        console.log('this is connection ', connection)
        if (connection && connection.rtcp) {
            try {
                connection.rtcp.addIceCandidate(data.candidate)
                console.log('ICE CANDIDATE ERROR : ************')
            }
            catch {
            }
        }
        else {
        }
    }

    else if (data.type === 'CUSTOM_OFFER' && data.user.username != state.user.profile.user.username) {
        // let user_connection = store.getState().connection.connections.find(cnction => cnction.user.username == data.user.username)
        let user_connections = store.getState().connection.connections.filter(cnction => cnction.user.username == data.user.username)
        user_connections.map(async user_connection => {
            if (user_connection) {
                user_connection = user_connection.rtcp
                if (!user_connection.remoteDescription) {
                    await user_connection.setRemoteDescription(new RTCSessionDescription(data.offer))

                    let answer = await user_connection.createAnswer()
                    await user_connection.setLocalDescription(answer)
                    let newdata = {
                        type: 'CUSTOM_ANSWER',
                        message: 'New Answer',
                        user: data.user,
                        answer: answer,
                        sender: store.getState().user.profile.user
                    }
                    newdata = JSON.stringify(newdata)
                    state.socket.active_video_socket.send(newdata)
                }
            }
        })
    }

    else if (data.type === 'CUSTOM_ANSWER' && data.user.username == state.user.profile.user.username) {
        // let user_connection = store.getState().connection.connections.find(cnction => cnction.user.username == data.sender.username)?.rtcp
        let user_connections = store.getState().connection.connections.filter(cnction => cnction.user.username == data.sender.username)?.rtcp
        user_connections.map(async user_connection => {
            if (!user_connection.remoteDescription) {
                await user_connection.setRemoteDescription(new RTCSessionDescription(data.answer))
            }
        })
    }

    else if (data.type === 'NEW_USER_JOINED_VIDEO_CHAT' && data.sender.username != state.user.profile.user.username && data.connection_for.username == state.user.profile.user.username) {
        AddVideoChatParticipant(
            {
                user: data.sender,
                offer: data.offer,
            }
        )
    }

    else if (data.type === 'SCREEN_SHARE_NEW_CONNECTION' && data.sender.username != state.user.profile.user.username && data.send_to.username == state.user.profile.user.username) {
        add_new_screen_share_connection(
            {
                user: data.sender,
                offer: data.offer,
            }
        )
    }
    else if (data.type === 'SCREEN_SHARE_NEW_CONNECTION_ANSWER' && data.sender.username != state.user.profile.user.username && data.answer_for.username == state.user.profile.user.username) {
        screen_share_response_answer(
            {
                user: data.sender,
                answer: data.answer,
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
    else if (data.type === 'USER_LEFT_MEETING') {
        let all_connections = store.getState().connection.connections
        all_connections.map(cnt => {
            if ((data.user.username == state.user.profile.username) || (data.user.username == cnt.user.username)) {
                cnt.rtcp.close()
            }
        })
        store.dispatch({
            type: 'ADD_OR_REMOVE_SNACK_BAR',
            payload: {
                message: `${data.user.username} has left the meeting`,
                type: 'info'
            }
        })
        store.dispatch(
            {
                type: REMOVE_USER_CONNECTION,
                payload: {
                    user: data.user,
                }
            }
        )
    }
    else if (data.type === 'CHAT_NEW_MESSAGE') {
        let new_data = data
        delete new_data.type
        store.dispatch(
            {
                type: CHAT_NEW_MESSAGE,
                payload: new_data
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