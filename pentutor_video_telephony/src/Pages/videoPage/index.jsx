import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Chat from "../../Components/ChatBox/Chat"
import ParticipantBlock from "../../Components/Participants/Participants"
import VideoStream from "../../Components/VideoStream/VideoStream"
import { addUserMedia } from "../../redux/actions/userActions"
import { AddToPinnedStream } from '../../redux/actions/stream'
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { AddVideoSocket } from "../../redux/actions/socket"
import VideoChatNotFound from "./VideoChatNotFound"
import { GetVideoChat } from "../../redux/actions/Video"
import { useParams } from "react-router-dom"
import VideoChatRequest from "./VideoChatRequest"




const VideoPageLoader = (props) => {
    return (
        <>
            loading....
        </>
    )
}


const StreamPage = (props) => {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    console.log(params)


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
                                props.stream.request_fulfilled ?
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
    GetVideoChat: GetVideoChat
}
export default connect(mapState, mapDispatch)(StreamPage)