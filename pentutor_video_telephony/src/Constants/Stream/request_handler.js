

import { store } from "../.."


export const ask_to_join_handler = async (data, success, fail) => {
    const state = store.getState()

    if (state.socket.active_video_socket && state.stream.rtcp_connection) {
        if (state.user.stream.video_stream) {
            state.user.stream.video_stream.getVideoTracks().forEach(async trck => {
                await state.stream.rtcp_connection.addTrack(
                    trck,
                    state.user.stream.video_stream
                )
            })
            state.user.stream.audio_stream.getAudioTracks().forEach(async trck => {
                await state.stream.rtcp_connection.addTrack(
                    trck,
                    state.user.stream.audio_stream
                )
            })
        }

        let offer = state.stream.rtcp_connection.createOffer()
        await state.stream.rtcp_connection.setLocalDescription(offer)

        let s_data = {
            type: 'NEW_CONNECTION_REQUEST',
            offer: state.stream.rtcp_connection.localDescription,
            sender: state.user.profile.user
        }
        s_data = JSON.stringify(s_data)
        state.socket.active_video_socket.send(s_data)
        success && success()
    }
}


