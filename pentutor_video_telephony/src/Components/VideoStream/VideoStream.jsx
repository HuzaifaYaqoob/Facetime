

import { useEffect } from "react"
import { connect } from "react-redux"
import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"
import BaseURL, { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"

const VideoStream = (props) => {
    const params = useParams()


    const noNewUserRequest = (socket, message) => {
        let user_inp = confirm(`${message.user.username} want to let him In, Do you want?`)
        let data = {
            type: user_inp ? 'NEW_CONNECTION_ACCEPTED' : 'CONNECTION_REJECTED',
            message: user_inp ?
                {
                    message: 'Request Approved',
                    user: message.user
                }
                :
                {
                    message: 'Request Canceled',
                    user: message.user
                }
        }
        data = JSON.stringify(data)
        socket.send(data)
    }

    const videoChatSocketActivated = () => {
        let vid_socket = new WebSocket(`${wsBaseURL}${video_websocket_url}${params.video_chat_id}/activated/?token=${Cookies.get('auth_token')}`)
        vid_socket.onopen = (e) => {
            console.log('connected')
        }

        vid_socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if (data.type == 'NEW_CONNECTION_REQUEST') {
                alert('new user request')
                noNewUserRequest(vid_socket, data)
            }
        }

        vid_socket.onclose = (e) => {
            console.log('CLOSED')
        }
        vid_socket.onerror = (e) => {
            console.log('Error')
        }
    }

    useEffect(() => {
        if (params.video_chat_id) {
            videoChatSocketActivated()
        }
    }, [])


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

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoStream)