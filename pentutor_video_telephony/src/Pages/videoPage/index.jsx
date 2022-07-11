import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Chat from "../../Components/ChatBox/Chat"
import ParticipantBlock from "../../Components/Participants/Participants"
import VideoStream from "../../Components/VideoStream/VideoStream"
import { addUserMedia } from "../../redux/actions/userActions"
import { AddRTCPConnection, AddToPinnedStream } from '../../redux/actions/stream'
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { AddVideoSocket } from "../../redux/actions/socket"
import VideoChatNotFound from "./VideoChatNotFound"
import { GetVideoChat } from "../../redux/actions/Video"
import { useNavigate, useParams } from "react-router-dom"
import VideoChatRequest from "./VideoChatRequest"
import { Triangle } from "react-loader-spinner"




const VideoPageLoader = (props) => {
    const loading_size = 80

    return (
        <div className="cover fixed bg-gray-100/50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Triangle ariaLabel="indicator" color='blue' width={loading_size} height={loading_size} />
        </div>
    )
}


const StreamPage = (props) => {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    const makePeerConnection = async () => {
        let connection = new RTCPeerConnection(null)
        props.AddRTCPConnection(
            {
                connection: connection
            }
        )
        connection.onicecandidate = function (event) {
            console.log('onicecandidate', event.candidate);
            if (event.candidate) {
                
            }
        }
        connection.ontrack = (e) => {
            console.log(e)
            alert('new track added')
        }
    }


    useEffect(() => {
        if (!props.stream.rtcp_connection) {
            makePeerConnection()
        }
    }, [])

    useEffect(() => {
        if (params.video_chat_id) {
            props.GetVideoChat(
                {
                    video_chat_id: params.video_chat_id
                },
                (result) => {
                    setLoading(false)
                },
                () => {
                    setLoading(false)
                    navigate('/')
                }
            )
        }
    }, [params.video_chat_id])


    return (
        <>
            {
                loading ?
                    <>
                        <VideoPageLoader />
                    </>
                    :
                    <>
                        {
                            props.video.video_chat ?
                                (props.stream.request_fulfilled ||
                                    (props.video.video_chat?.host?.username == props.user?.profile?.user?.username)) ?
                                    <div className="flex items-stretch justify-between p-4 min-h-screen max-h-screen overflow-hidden h-screen gap-4">
                                        <VideoStream />
                                        {
                                            props.utility.active_sidetab && props.utility.active_sidetab == 'CHAT' &&
                                            <>
                                                <Chat />
                                            </>
                                        }
                                        {
                                            props.utility.active_sidetab && props.utility.active_sidetab == 'PARTICIPANTS' &&
                                            <>
                                                <ParticipantBlock />
                                            </>
                                        }
                                    </div>
                                    :
                                    <>
                                        <VideoChatRequest />
                                    </>
                                :
                                <VideoChatNotFound />
                        }
                    </>
            }
        </>
    )
}

const mapState = state => {
    return state
}
const mapDispatch = {
    addUserMedia: addUserMedia,
    AddToPinnedStream: AddToPinnedStream,
    AddVideoSocket: AddVideoSocket,
    GetVideoChat: GetVideoChat,
    AddRTCPConnection: AddRTCPConnection
}
export default connect(mapState, mapDispatch)(StreamPage)