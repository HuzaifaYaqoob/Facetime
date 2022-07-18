import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import Chat from "../../Components/ChatBox/Chat"
import ParticipantBlock from "../../Components/Participants/Participants"
import VideoStream from "../../Components/VideoStream/VideoStream"
import { addUserMedia } from "../../redux/actions/userActions"
import { AddToPinnedStream, RequestFulfilled } from '../../redux/actions/stream'
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { AddVideoSocket } from "../../redux/actions/socket"
import VideoChatNotFound from "./VideoChatNotFound"
import { GetVideoChat } from "../../redux/actions/Video"
import { useNavigate, useParams } from "react-router-dom"
import VideoChatRequest from "./VideoChatRequest"
import { Triangle } from "react-loader-spinner"
import Cookies from "js-cookie"
import { createActiveVideoSocket } from "../../Constants/Sockets/ActiveVideoSocket"
import { createVideoChatUserSocket } from "../../Constants/Sockets/VideoSocket"




const VideoPageLoader = (props) => {
    const loading_size = 80

    return (
        <div className="cover fixed bg-gray-100/50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Triangle ariaLabel="indicator" color='blue' width={loading_size} height={loading_size} />
        </div>
    )
}


const StreamPage = (props) => {
    // console.log(props.connection.connections)
    const [loading, setLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [requested, setRequested] = useState(false)


    const get_user_medias = async (data, success, fail) => {

        let stream_vid, stream_aud = null
        try {
            stream_vid = await navigator.mediaDevices.getUserMedia({ video: true }) || null
        } catch { }
        try {
            stream_aud = await navigator.mediaDevices.getUserMedia({ audio: true }) || null
        } catch { }

        if (!stream_vid || !stream_aud) {
            dispatch({
                type: 'ADD_OR_REMOVE_SNACK_BAR',
                payload: {
                    message: 'Media is required to joing this meeting. \n You can disable later',
                    type: 'warning'
                }
            })
            navigate('/')
        }
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
        success && success()
    }

    const get_video_chat = () => {
        props.GetVideoChat(
            {
                video_chat_id: params.video_chat_id
            },
            (result) => {
                if (window != undefined) {
                    createVideoChatUserSocket(
                        { video_id: result.id },
                    )
                    createActiveVideoSocket(
                        { video_id: result.id },
                        () => {

                            setLoading(false)
                        }
                    )
                }
                get_user_medias(
                    {},
                    () => {
                    }
                )
            },
            () => {
                setLoading(false)
                dispatch({
                    type: 'ADD_OR_REMOVE_SNACK_BAR',
                    payload: {
                        message: 'Video Chat not found or something went wrong',
                        type: 'error'
                    }
                })
                navigate('/')
            }
        )
    }

    useEffect(() => {
        if (Cookies.get('auth_token')) {
            if (params.video_chat_id) {
                get_video_chat()
            }
        }
        else {
            dispatch({
                type: 'ADD_OR_REMOVE_SNACK_BAR',
                payload: {
                    message: 'Login is Required to access this page',
                    type: 'warning'
                }
            })
            navigate('/login')
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
                                    // (props.user.profile && props.video.video_chat?.allowed_users.find(usr => usr.username == props.user.profile.user.username)) ||
                                    // (props.user.profile && props.video.video_chat?.paticipants.find(usr => usr.username == props.user.profile.user.username)) ||
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
    RequestFulfilled: RequestFulfilled
}
export default connect(mapState, mapDispatch)(StreamPage)