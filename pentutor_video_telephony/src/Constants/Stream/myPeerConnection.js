import { store } from "../.."
import { AddRTCPConnection } from "../../redux/actions/stream"


const onIceCandidate = (event) => {
    const state = store.getState()
    if (event.candidate) {
        let data = {
            type: 'ICE_CANDIDATE',
            sender: state.user.profile.user,
            candidate: event.candidate
        }
        state.socket.active_video_socket.send(JSON.stringify(data))
    }
}

const onNegotiationNeeded = async (e, connection) => {
    const state = store.getState()
    let offer = connection.createOffer()
    await connection.setLocalDescription(offer)

    let data = {
        type: 'CUSTOM_OFFER',
        offer: connection.localDescription,
        user: state.user.profile.user
    }
    data = JSON.stringify(data)
    state.socket.active_video_socket.send(data)
}

const onNewTrack = async (e) => {
    const state = store.getState()
    if (state.stream.remote.stream.getVideoTracks().length > 0 && e.track.kind == 'video') {
        state.stream.remote.stream.getVideoTracks().forEach(trc => {
            trc.enabled = false
        })
    }

    e.streams[0].getTracks().forEach(tr => {
        state.stream.remote.stream.addTrack(tr)
    })
}


const createMyPeerConnection = (data, success, fail) => {
    let connection = new RTCPeerConnection(null)
}

export default createMyPeerConnection