import { useEffect, useRef, useState } from "react"
import { Triangle } from "react-loader-spinner"
import { connect, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AddActiveVideoSocket, AddVideoSocket } from "../../redux/actions/socket"
import { AddToPinnedStream, RequestFulfilled } from "../../redux/actions/stream"
import { addUserMedia } from "../../redux/actions/userActions"
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"



const VideoChatRequest = (props) => {
    const user_video = useRef()
    const params = useParams()
    const navigate = useNavigate()


    const ask_to_join_handler = async () => {
        if (props.socket.video_socket && props.stream.rtcp_connection) {
            if (props.user.stream.video_stream) {
                props.user.stream.video_stream.getVideoTracks().forEach(async trck => {
                    await props.stream.rtcp_connection.addTrack(
                        trck,
                        props.user.stream.video_stream
                    )
                })
                props.user.stream.audio_stream.getAudioTracks().forEach(async trck => {
                    await props.stream.rtcp_connection.addTrack(
                        trck,
                        props.user.stream.audio_stream
                    )
                })
            }

            let offer = props.stream.rtcp_connection.createOffer()
            await props.stream.rtcp_connection.setLocalDescription(offer)

            let data = {
                type: 'NEW_CONNECTION_REQUEST',
                offer: props.stream.rtcp_connection.localDescription
            }
            data = JSON.stringify(data)
            props.socket.video_socket.send(data)
            props.setRequested(true)
        }
    }


    useEffect(() => {
        if (user_video.current) {
            user_video.current.srcObject = props.user.stream.video_stream
            user_video.current.play()
        }
    }, [user_video.current])



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
                        {
                            props.socket.video_socket ?
                                <div className="flex items-center gap-3 w-full justify-center">
                                    <div
                                        className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-900 active:bg-indigo-600 text-white cursor-pointer"
                                        onClick={() => {
                                            if (!props.requested) {
                                                ask_to_join_handler()
                                            }
                                        }}
                                    >{props.requested ?
                                        <div className="flex items-center justify-center">
                                            <Triangle ariaLabel="indicator" color='blue' width={60} height={60} />
                                        </div>
                                        : 'Ask to Join'}</div>
                                    <div
                                        className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                        onClick={() => {
                                            props.setRequested(false)
                                            navigate('/')
                                        }}
                                    >Cancel</div>
                                </div>
                                :
                                <div className="mx-auto text-center">
                                    <div className="flex items-center justify-center">
                                        <Triangle ariaLabel="indicator" color='blue' width={60} height={60} />
                                    </div>
                                </div>
                        }
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
    AddVideoSocket: AddVideoSocket,
    AddActiveVideoSocket: AddActiveVideoSocket,
    RequestFulfilled: RequestFulfilled
}

export default connect(mapState, mapDispatch)(VideoChatRequest)