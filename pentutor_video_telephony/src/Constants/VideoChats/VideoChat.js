import { store } from "../.."
import { createUserConnection, onNegotiationNeeded } from "../Connections/userConnections"



export const JoinVideoChatParticipants = async (data, success, fail) => {
    const state = store.getState()
    let vid_stream = store.getState().user.stream.video_stream
    let aud_stream = store.getState().user.stream.audio_stream

    state.video.video_chat.paticipants.filter(mpt => mpt.username != state.user.profile.user.username).map(async pt => {
        if (vid_stream || aud_stream) {
            pt.type = data.type
            let my_connection = createUserConnection({ user: pt })

            if (vid_stream) {
                vid_stream.getVideoTracks().forEach(trck => {
                    my_connection.addTrack(trck, vid_stream)
                })
            }
            if (aud_stream) {
                aud_stream.getAudioTracks().forEach(trck => {
                    my_connection.addTrack(trck, aud_stream)
                })
            }

            let offer = await my_connection.createOffer()
            if (!my_connection.localDescription) {
                await my_connection.setLocalDescription(offer)
            }
            if (!my_connection.onnegotiationneeded) {
                my_connection.onnegotiationneeded = (e) => onNegotiationNeeded(e, { user: pt })
            }

            let join_data = {
                type: 'NEW_USER_JOINED_VIDEO_CHAT',
                sender: state.user.profile.user,
                offer: my_connection.localDescription,
                connection_for: pt
            }
            state.socket.active_video_socket.send(JSON.stringify(join_data))
        }
    })
    success && success()
}



export const AddVideoChatParticipant = async (data, success, fail) => {
    const state = store.getState()
    let vid_stream = state.user.stream.video_stream
    let aud_stream = state.user.stream.audio_stream
    
    if (vid_stream || aud_stream) {
        data.user.type = data.type ? data.type : 'CAM'
        let my_connection = createUserConnection({ user: data.user })

        await my_connection.setRemoteDescription(new RTCSessionDescription(data.offer))

        if (vid_stream) {
            vid_stream.getVideoTracks().forEach(trck => {
                my_connection.addTrack(trck, vid_stream)
            })
        }
        if (aud_stream) {
            aud_stream.getAudioTracks().forEach(trck => {
                my_connection.addTrack(trck, aud_stream)
            })
        }

        let answer = await my_connection.createAnswer()
        if (my_connection.localDescription) {
        }
        else {
            await my_connection.setLocalDescription(answer)
        }

        if (!my_connection.onnegotiationneeded) {
            my_connection.onnegotiationneeded = (e) => onNegotiationNeeded(e, { user: data.user })
        }
        let join_data = {
            type: 'NEW_USER_JOINED_VIDEO_CHAT_APPROVED',
            sender: state.user.profile.user,
            answer: my_connection.localDescription,
            answer_for: data.user
        }
        state.socket.active_video_socket.send(JSON.stringify(join_data))
        success && success()
    }
}


export const AddAnswerVideoChat = async (data, success, fail) => {
    const state = store.getState()
    data.user.type = data.type ? data.type : 'CAM'
    let my_connection = createUserConnection({ user: data.user })
    if (my_connection.remoteDescription) {
    }
    else {
        await my_connection.setRemoteDescription(new RTCSessionDescription(data.answer))
    }
    if (!my_connection.onnegotiationneeded) {
        my_connection.onnegotiationneeded = (e) => onNegotiationNeeded(e, { user: data.user })
    }
    success && success()
}

