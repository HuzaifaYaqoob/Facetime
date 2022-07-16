

import { store } from "../.."
import { ADD_NEW_USER_CONNECTION } from "../../redux/ActionTypes/connections"
import { ADD_CONNECTION_MEDIA_STREAM } from "../../redux/ActionTypes/streamTypes"


const onUserIceCandidate = (event, data, success, fail) => {
    const state = store.getState()
    let connection = state.connection.connections.find(cnct => cnct.user.username == data.user.username)
    if (connection && event.candidate) {
        let offer = connection.rtcp.localDescription
        if (offer) {
            let s_data = {
                type: 'ICE_CANDIDATE',
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


const onNegotiationNeeded = async (e, data) => {
    console.log('negociate')
    const state = store.getState()
    let user_connection = store.getState().connection.connections.find(cnction => cnction.user.username == data.user.username)?.rtcp

    let offer = user_connection.createOffer()
    await user_connection.setLocalDescription(offer)

    let new_data = {
        type: 'CUSTOM_OFFER',
        offer: user_connection.localDescription,
        user: state.user.profile.user
    }
    new_data = JSON.stringify(new_data)
    state.socket.active_video_socket.send(new_data)
}

const onUserNewTrack = (event, data, success, fail) => {
    console.log('new track addedd')
    let user_connection = store.getState().connection.connections.find(cnt => cnt.user.username == data.user.username)
    if (user_connection) {
        if (!user_connection.stream) {
            let new_stream = new MediaStream()
            store.dispatch(
                {
                    type: ADD_CONNECTION_MEDIA_STREAM,
                    payload: {
                        user: data.user,
                        stream: new_stream
                    }
                }
            )

        }

        let user_stream = store.getState().connection.connections.find(cn => cn.user.username == data.user.username)?.stream

        event.streams[0].getTracks().forEach(trck => {
            if (trck.kind == 'video' && user_stream.getVideoTracks().length > 0) {
                user_stream.getVideoTracks().forEach(t => {
                    user_stream.removeTrack(t)
                })
            }
            user_stream.addTrack(trck, event.streams[0])
        })
    }
}

export const createUserConnection = (data, success, fail) => {
    const dispatch = store.dispatch
    const state = store.getState()

    let connection = state.connection.connections.find(cnct => cnct.user.username == data.user.username)
    if (connection) {
        return connection.rtcp
    }
    else {
        connection = new RTCPeerConnection()
        dispatch(
            {
                type: ADD_NEW_USER_CONNECTION,
                payload: {
                    connection: {
                        user: data.user,
                        rtcp: connection
                    }
                }
            }
        )

        let user_connection = store.getState().connection.connections.find(cnction => cnction.user.username == data.user.username)
        if (user_connection) {
            user_connection.rtcp.onicecandidate = (e) => onUserIceCandidate(e, { user: data.user })
            user_connection.rtcp.onnegotiationneeded = (e) => onNegotiationNeeded(e, { user: data.user })
            user_connection.rtcp.ontrack = (e) => onUserNewTrack(e, { user: data.user })
        }
        return user_connection.rtcp
    }
}