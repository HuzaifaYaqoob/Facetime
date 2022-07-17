

import { store } from "../.."


export const ask_to_join_handler = async (data, success, fail) => {
    const state = store.getState()

    if (state.socket.active_video_socket) {
        let s_data = JSON.stringify({
            type: 'NEW_CONNECTION_REQUEST',
            sender: state.user.profile.user
        })
        state.socket.active_video_socket.send(s_data)
        success && success()
    }
    else {
        alert('something went wrong')
    }
}