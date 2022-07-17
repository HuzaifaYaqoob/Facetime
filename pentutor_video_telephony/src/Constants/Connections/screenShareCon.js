
import { store } from "../.."
import { ADD_ALL_SCREEN_SHARE_CONNECTIONS, ADD_NEW_USER_CONNECTION, ADD_SCREEN_SHARE_CONNECTION } from "../../redux/ActionTypes/connections"
import { ADD_CONNECTION_MEDIA_STREAM, ADD_SCREEN_CONNECTION_STREAM } from "../../redux/ActionTypes/streamTypes"


const screen_share_ice_candidate = (event, data, success, fail) => {
    const state = store.getState()
    let connection = state.connection.connections.find(cnct =>
    (cnct.user.username == data.user.username &&
        cnct.user.type == 'SCREEN')
    )
    if (connection && event.candidate) {
        let offer = connection.rtcp.localDescription
        if (offer) {
            let s_data = {
                type: 'SCREEN_ICE_CANDIDATE',
                offer: offer,
                sender: state.user.profile.user,
                send_to: data.user,
                candidate: event.candidate
            }
            s_data = JSON.stringify(s_data)
            state.socket.active_video_socket.send(s_data)
        }
    }
}

const screen_share_new_track = (event, data, success, fail) => {
    let user_connection = store.getState().connection.connections.find(cnt =>
    (cnt.user.username == data.user.username &&
        cnt.user.type == 'SCREEN')
    )
    if (user_connection) {
        if (!user_connection.stream) {
            let new_stream = new MediaStream()
            store.dispatch(
                {
                    type: ADD_SCREEN_CONNECTION_STREAM,
                    payload: {
                        user: data.user,
                        stream: new_stream
                    }
                }
            )
        }

        let user_stream = store.getState().connection.connections.find(cn =>
            cn.user.username == data.user.username &&
            cn.user.type == 'SCREEN'
        )?.stream

        event.streams[0].getTracks().forEach(trck => {
            user_stream.addTrack(trck, event.streams[0])
            console.log(event.streams[0], trck)
        })
    }
}

const screen_share_negotiate = (event, data, success, fail) => {

}

const get_or_create_ScreenShareConnection = (data, success, fail) => {
    const state = store.getState()
    let connection = state.connection.connections.find(cnt =>
    (cnt.user.username == data.user.username &&
        cnt.user.type == 'SCREEN')
    )

    if (connection) {
        return connection.rtcp
    }
    else {
        let new_connection = new RTCPeerConnection()
        new_connection.onicecandidate = (e) => screen_share_ice_candidate(e, { user: data.user })
        new_connection.ontrack = (e) => screen_share_new_track(e, { user: data.user })
        store.dispatch({
            type: ADD_NEW_USER_CONNECTION,
            payload: {
                connection: {
                    user: {
                        ...data.user,
                        type: 'SCREEN'
                    },
                    rtcp: new_connection

                }
            }
        })
        return new_connection
    }
}



export const add_new_screen_share_connection = async (data, success, fail) => {
    const state = store.getState()

    let my_connection = get_or_create_ScreenShareConnection({ user: data.user })

    await my_connection.setRemoteDescription(new RTCSessionDescription(data.offer))


    let answer = await my_connection.createAnswer()
    if (!my_connection.localDescription) {
        await my_connection.setLocalDescription(answer)
    }

    let join_data = {
        type: 'SCREEN_SHARE_NEW_CONNECTION_ANSWER',
        sender: state.user.profile.user,
        answer: my_connection.localDescription,
        answer_for: data.user
    }
    state.socket.active_video_socket.send(JSON.stringify(join_data))
}


export const screen_share_response_answer = async (data, success, fail) => {
    let my_connection = get_or_create_ScreenShareConnection({ user: data.user })
    if (!my_connection.remoteDescription) {
        await my_connection.setRemoteDescription(new RTCSessionDescription(data.answer))
    }
}

export const ShareScreenConnection = async (data, success, fail) => {
    const state = store.getState()
    state.connection.connections.map(async cnt => {
        let connection = get_or_create_ScreenShareConnection({ user: cnt.user })
        let vid_stream = state.user.stream.screen_share

        vid_stream.getVideoTracks().forEach(trck => {
            connection.addTrack(trck, vid_stream)
        })

        let offer = await connection.createOffer()
        if (!connection.localDescription) {
            await connection.setLocalDescription(offer)
        }

        let join_data = {
            type: 'SCREEN_SHARE_NEW_CONNECTION',
            sender: state.user.profile.user,
            offer: connection.localDescription,
            send_to: cnt.user
        }
        state.socket.active_video_socket.send(JSON.stringify(join_data))

        if (!connection.onnegotiationneeded) {
            connection.onnegotiationneeded = (e) => screen_share_negotiate(e)
        }
    })

}