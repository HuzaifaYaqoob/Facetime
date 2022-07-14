

import { store } from "../.."
import { ADD_NEW_USER_CONNECTION } from "../../redux/ActionTypes/connections"


const onUserIceCandidate = (event, data, success, fail) => {
    const state = store.getState()
    let connection = state.connection.connections.find(cnct => cnct.user.username == data.user.username)
    if (connection) {
        let offer = connection.rtcp.localDescription
        if (offer) {
            let s_data = {
                type: 'ICE_CANDIDATE',
                offer: offer,
                sender: state.user.profile.user,
                send_to: data.user
            }
            s_data = JSON.stringify(s_data)
            state.socket.active_video_socket.send(s_data)
        }
    }
    else {
        console.log('user connection not found')
    }
}

const onUserNewTrack = (event, data, success, fail) => {
    console.log(`new track for ${data.user}`)
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
        connection.onicecandidate = (e) => onUserIceCandidate(e, { user: data.user })
        connection.ontrack = (e) => onUserNewTrack(e, { user: data.user })
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
        return connection
    }
}