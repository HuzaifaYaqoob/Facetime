import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import Chat from "../../Components/ChatBox/Chat"
import ParticipantBlock from "../../Components/Participants/Participants"
import VideoStream from "../../Components/VideoStream/VideoStream"
import { addUserMedia } from "../../redux/actions/userActions"
import { AddRTCPConnection, AddToPinnedStream, RequestFulfilled } from '../../redux/actions/stream'
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { AddVideoSocket } from "../../redux/actions/socket"
import VideoChatNotFound from "./VideoChatNotFound"
import { GetVideoChat } from "../../redux/actions/Video"
import { useNavigate, useParams } from "react-router-dom"
import VideoChatRequest from "./VideoChatRequest"
import { Triangle } from "react-loader-spinner"
import Cookies from "js-cookie"




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
    const dispatch = useDispatch()
    const [requested, setRequested] = useState(false)


    const makePeerConnection = async () => {
        let connection = new RTCPeerConnection(null)
        props.AddRTCPConnection(
            {
                connection: connection
            }
        )


        connection.onicecandidate = function (event) {
            if (event.candidate) {
                let data = {
                    type: 'ICE_CANDIDATE',
                    // user: props.user.profile.user,
                    candidate: event.candidate
                }
                props.socket.video_socket.send(JSON.stringify(data))
            }
        }
        connection.ontrack = async (e) => {
            console.log('new track added', e)
            if (props.stream.remote.stream.getVideoTracks().length > 0 && e.track.kind == 'video') {
                props.stream.remote.stream.getVideoTracks().forEach(async trc => {
                    trc.enabled = await false
                })
            }

            e.streams[0].getTracks().forEach(tr => {
                props.stream.remote.stream.addTrack(tr)
            })
            console.log(props.stream.remote.stream.getTracks())
        }
    }

    const get_user_medias = async () => {
        const stream_vid = await navigator.mediaDevices.getUserMedia({ video: true })
        const stream_aud = await navigator.mediaDevices.getUserMedia({ audio: true })
        props.addUserMedia(
            {
                video_stream: stream_vid,
                audio_stream: stream_aud
            }
        )
        props.AddToPinnedStream(
            {
                pinned_stream: stream_vid
            }
        )
    }

    const onNewMessage = async (event) => {
        let data = event.data
        data = JSON.parse(data)

        if (data.type === 'CONNECTION_ACCEPTED') {
            await props.stream.rtcp_connection.setRemoteDescription(new RTCSessionDescription(data.answer))
            props.RequestFulfilled()
        }
        else if (data.type === 'CONNECTION_REJECTED') {
            alert('You are not allowed')
            setRequested(false)
        }
        else if (data.type === 'ICE_CANDIDATE') {
            try {
                props.stream.rtcp_connection.addIceCandidate(data.candidate)
            }
            catch { }
        }
    }

    const videoChatWebSocket = (success, fail) => {
        const vid_socket = new WebSocket(wsBaseURL + video_websocket_url + params.video_chat_id + `/?token=${Cookies.get('auth_token')}`)

        vid_socket.onopen = (event) => {
            props.AddVideoSocket(
                {
                    socket: vid_socket
                }
            )
        }
        // vid_socket.addEventListener('message', onNewMessage)

        vid_socket.onclose = (event) => {
            // alert('something went wrong')
        }
    }


    useEffect(() => {
        if (!props.stream.rtcp_connection, props.socket.video_socket) {
            makePeerConnection()
        }
    }, [props.socket.video_socket])

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

    useEffect(() => {
        get_user_medias()
    }, [])


    useEffect(() => {
        if (props.user.stream.video_stream && props.user.stream.audio_stream && !props.socket.video_socket) {
            videoChatWebSocket()
        }
    }, [props.user.stream.video_stream, props.user.stream.audio_stream])


    useEffect(() => {
        if (props.socket.video_socket && props.stream.rtcp_connection) {
            props.socket.video_socket.addEventListener('message', onNewMessage)
        }
    }, [props.socket.video_socket, props.stream.rtcp_connection])

    useEffect(() => {
        if (props.socket.active_video_socket) {

            let connection = props.stream.rtcp_connection
            connection.onnegotiationneeded = async (e) => {

                let offer = connection.createOffer()
                await connection.setLocalDescription(offer)

                let data = {
                    type: 'CUSTOM_OFFER',
                    offer: connection.localDescription,
                    user: props.user.profile.user
                }
                data = JSON.stringify(data)
                props.socket.active_video_socket.send(data)
            }
        }

    }, [props.socket.active_video_socket])




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
                                    (props.video.video_chat?.host?.username === props.user?.profile?.user?.username)) ?
                                    <div className="flex items-stretch justify-between p-2 md:p-4 min-h-screen max-h-screen overflow-hidden h-screen gap-4">
                                        <VideoStream />
                                        {
                                            props.utility.active_sidetab && props.utility.active_sidetab === 'CHAT' &&
                                            <>
                                                <Chat />
                                            </>
                                        }
                                        {
                                            props.utility.active_sidetab && props.utility.active_sidetab === 'PARTICIPANTS' &&
                                            <>
                                                <ParticipantBlock />
                                            </>
                                        }
                                    </div>
                                    :
                                    <>
                                        <VideoChatRequest requested={requested} setRequested={setRequested} />
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
    AddRTCPConnection: AddRTCPConnection,
    RequestFulfilled: RequestFulfilled
}
export default connect(mapState, mapDispatch)(StreamPage)