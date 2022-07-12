

import { useEffect } from "react"
import { connect } from "react-redux"
import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"
import BaseURL, { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"

const VideoStream = (props) => {
    const params = useParams()


    const handleNewUserRequest = async (socket, message) => {
        let user_inp = window.confirm(`${message.user.username} want to let him In, Do you want?`)
        let data = {}
        if (user_inp) {

            
            await props.stream.rtcp_connection.addTrack(props.user.stream.video_stream.getVideoTracks()[0])
            await props.stream.rtcp_connection.addTrack(props.user.stream.audio_stream.getAudioTracks()[0])
            
            
            await props.stream.rtcp_connection.setRemoteDescription(new RTCSessionDescription(message.offer))
            
            let answer = await props.stream.rtcp_connection.createAnswer()
            await props.stream.rtcp_connection.setLocalDescription(answer)
            

            data = {
                type: 'CONNECTION_ACCEPTED',
                message: 'Request Approved',
                user: message.user,
                answer: answer
            }
        }
        else {
            data = {
                type: 'CONNECTION_REJECTED',
                message: 'Request Canceled',
                user: message.user
            }
        }


        data = JSON.stringify(data)
        socket.send(data)

    }

    const videoChatSocketActivated = () => {
        let ac_vid_socket = new WebSocket(`${wsBaseURL}${video_websocket_url}${params.video_chat_id}/activated/?token=${Cookies.get('auth_token')}`)
        ac_vid_socket.onopen = (e) => {
            props.AddActiveVideoSocket(
                {
                    socket: ac_vid_socket
                }
            )
            if (props.socket.video_socket) {
                props.socket.video_socket.close()
            }
        }
        ac_vid_socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if (data.type == 'NEW_CONNECTION_REQUEST') {
                handleNewUserRequest(ac_vid_socket, data)
            }
        }

        ac_vid_socket.onclose = (e) => {
        }
        ac_vid_socket.onerror = (e) => {
        }
    }

    useEffect(() => {
        if (params.video_chat_id && props.user.stream.video_stream && props.user.stream.audio_stream) {
            videoChatSocketActivated()
        }
    }, [props.user.stream.video_stream, props.user.stream.audio_stream])


    return (
        <>
            <div className="w-full flex-1 flex flex-col gap-4">
                <VideoBlock />
                <MenuBlock />
            </div>
        </>
    )
}



const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    AddActiveVideoSocket: AddActiveVideoSocket
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoStream)