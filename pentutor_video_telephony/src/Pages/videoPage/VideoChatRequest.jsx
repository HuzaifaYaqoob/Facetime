import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { AddVideoSocket } from "../../redux/actions/socket"
import { AddToPinnedStream } from "../../redux/actions/stream"
import { addUserMedia } from "../../redux/actions/userActions"
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"



const VideoChatRequest = (props) => {
    const user_video = useRef()

    const videoChatWebSocket = (success, fail) => {
        const vid_socket = new WebSocket(wsBaseURL + video_websocket_url)

        vid_socket.onopen = (event) => {
            props.AddVideoSocket(
                {
                    socket: vid_socket
                }
            )
        }
        vid_socket.onmessage = (event) => {

        }

        vid_socket.onclose = (event) => {

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

    useEffect(() => {
        if (user_video.current) {
            user_video.current.srcObject = props.user.stream.video_stream
            user_video.current.play()
        }
    }, [user_video.current])

    useEffect(() => {
        videoChatWebSocket()
        get_user_medias()
    }, [])

    return (
        <>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="flex items-center justify-between max-w-6xl w-full gap-5">
                    <div className="flex-1 h-[400px] relative bg-gray-900 rounded-md">
                        {
                            props.user.stream.video_stream ?
                                <>
                                    <video
                                        className="w-auto max-w-full max-h-full h-auto object-fill mx-auto"
                                        ref={user_video}
                                    ></video>
                                </>
                                :
                                <></>
                        }
                        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex items-center gap-4">
                            <div className={`rounded-full bg-white h-[40px] w-[40px] flex items-center justify-center cursor-pointer`}>

                            </div>
                            <div className={`rounded-full bg-white h-[40px] w-[40px] flex items-center justify-center cursor-pointer`}>

                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-center text-4xl mb-4 capitalize">{props.video.video_chat?.name}</h3>
                        <div className="flex items-center gap-3 w-full justify-center">
                            <div className="px-4 py-2 rounded-full bg-indigo-600 text-white cursor-pointer">Ask to Join</div>
                            <div className="px-4 py-2 rounded-full bg-gray-200 cursor-pointer">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const mapState = state => {
    return state
}

const mapDispatch = {
    addUserMedia: addUserMedia,
    AddToPinnedStream: AddToPinnedStream,
    AddVideoSocket: AddVideoSocket
}

export default connect(mapState, mapDispatch)(VideoChatRequest)