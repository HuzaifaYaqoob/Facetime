import { useEffect, useRef, useState } from "react"
import { Triangle } from "react-loader-spinner"
import { connect, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { ask_to_join_handler } from "../../Constants/Stream/request_handler"
import { AddActiveVideoSocket, AddVideoSocket } from "../../redux/actions/socket"
import { AddToPinnedStream, RequestFulfilled } from "../../redux/actions/stream"
import { addUserMedia } from "../../redux/actions/userActions"
import { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"



const VideoChatRequest = (props) => {
    const user_video = useRef()
    const params = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        if (user_video.current) {
            user_video.current.srcObject = props.user.stream.video_stream
            user_video.current.play()
        }
    }, [user_video.current, props.user.stream.video_stream])



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
                            <div
                                className={`rounded-full ${props.user.stream.video_stream?.getVideoTracks()[0].enabled ? 'bg-white' : 'bg-red-600'} h-[40px] w-[40px] flex items-center justify-center cursor-pointer`}
                                onClick={() => {
                                    if (props.user.stream.video_stream) {
                                        props.user.stream.video_stream.getVideoTracks()[0].enabled = !props.user.stream.video_stream.getVideoTracks()[0].enabled
                                        props.addUserMedia(
                                            {
                                                video: props.user.stream.video_stream
                                            }
                                        )
                                    }
                                }}
                            >
                                <svg className="w-[18px] h-[18px] md:w-[25px] md:h-[25px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        className={`${props.user.stream.video_stream?.getVideoTracks()[0].enabled ? 'fill-black' : 'fill-white'}`}
                                        fillRule="evenodd" clipRule="evenodd" d="M0 5C0 4.46957 0.210714 3.96086 0.585786 3.58579C0.960859 3.21071 1.46957 3 2 3H9.5C9.98509 2.99994 10.4537 3.17619 10.8185 3.49593C11.1833 3.81566 11.4195 4.25709 11.483 4.738L14.593 3.356C14.7452 3.28817 14.912 3.25946 15.0781 3.27249C15.2443 3.28551 15.4045 3.33985 15.5443 3.43056C15.6841 3.52128 15.7991 3.6455 15.8786 3.79192C15.9582 3.93835 15.9999 4.10235 16 4.269V11.731C15.9999 11.8975 15.9581 12.0614 15.8786 12.2077C15.7991 12.354 15.6843 12.4781 15.5446 12.5688C15.4049 12.6595 15.2448 12.7139 15.0788 12.727C14.9128 12.7401 14.7462 12.7116 14.594 12.644L11.483 11.262C11.4195 11.7429 11.1833 12.1843 10.8185 12.5041C10.4537 12.8238 9.98509 13.0001 9.5 13H2C1.46957 13 0.960859 12.7893 0.585786 12.4142C0.210714 12.0391 0 11.5304 0 11V5ZM11.5 10.175L15 11.731V4.269L11.5 5.825V10.175ZM2 4C1.73478 4 1.48043 4.10536 1.29289 4.29289C1.10536 4.48043 1 4.73478 1 5V11C1 11.2652 1.10536 11.5196 1.29289 11.7071C1.48043 11.8946 1.73478 12 2 12H9.5C9.76522 12 10.0196 11.8946 10.2071 11.7071C10.3946 11.5196 10.5 11.2652 10.5 11V5C10.5 4.73478 10.3946 4.48043 10.2071 4.29289C10.0196 4.10536 9.76522 4 9.5 4H2Z" />
                                </svg>
                            </div>
                            <div
                                className={`rounded-full ${props.user.stream.audio_stream?.getAudioTracks()[0].enabled ? 'bg-white' : 'bg-red-600'} bg-white h-[40px] w-[40px] flex items-center justify-center cursor-pointer`}
                                onClick={() => {
                                    if (props.user.stream.audio_stream) {
                                        props.user.stream.audio_stream.getAudioTracks()[0].enabled = !props.user.stream.audio_stream.getAudioTracks()[0].enabled
                                        props.addUserMedia(
                                            {
                                                audio: props.user.stream.audio_stream
                                            }
                                        )
                                    }
                                }}
                            >
                                <svg className="w-[10px] h-[17px] md:w-[18px] md:h-[25px]" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        className={`${props.user.stream.audio_stream?.getAudioTracks()[0].enabled ? 'fill-black' : 'fill-white'}`}
                                        d="M5.11111 6.25C5.11111 4.5924 5.78422 3.00269 6.98237 1.83058C8.18052 0.65848 9.80556 0 11.5 0C13.1944 0 14.8195 0.65848 16.0176 1.83058C17.2158 3.00269 17.8889 4.5924 17.8889 6.25V15C17.8889 16.6576 17.2158 18.2473 16.0176 19.4194C14.8195 20.5915 13.1944 21.25 11.5 21.25C9.80556 21.25 8.18052 20.5915 6.98237 19.4194C5.78422 18.2473 5.11111 16.6576 5.11111 15V6.25ZM11.5 2.5C10.4833 2.5 9.50831 2.89509 8.78942 3.59835C8.07053 4.30161 7.66667 5.25544 7.66667 6.25V15C7.66667 15.9946 8.07053 16.9484 8.78942 17.6517C9.50831 18.3549 10.4833 18.75 11.5 18.75C12.5167 18.75 13.4917 18.3549 14.2106 17.6517C14.9295 16.9484 15.3333 15.9946 15.3333 15V6.25C15.3333 5.25544 14.9295 4.30161 14.2106 3.59835C13.4917 2.89509 12.5167 2.5 11.5 2.5ZM1.27778 13.75C1.61667 13.75 1.94167 13.8817 2.1813 14.1161C2.42093 14.3505 2.55556 14.6685 2.55556 15C2.55556 17.3206 3.49791 19.5462 5.17532 21.1872C6.85273 22.8281 9.12779 23.75 11.5 23.75C13.8722 23.75 16.1473 22.8281 17.8247 21.1872C19.5021 19.5462 20.4444 17.3206 20.4444 15C20.4444 14.6685 20.5791 14.3505 20.8187 14.1161C21.0583 13.8817 21.3833 13.75 21.7222 13.75C22.0611 13.75 22.3861 13.8817 22.6257 14.1161C22.8654 14.3505 23 14.6685 23 15C23.0005 17.7676 21.9582 20.4383 20.0723 22.5014C18.1865 24.5644 15.5894 25.875 12.7778 26.1825V28.75C12.7778 29.0815 12.6432 29.3995 12.4035 29.6339C12.1639 29.8683 11.8389 30 11.5 30C11.1611 30 10.8361 29.8683 10.5965 29.6339C10.3568 29.3995 10.2222 29.0815 10.2222 28.75V26.1825C7.41062 25.875 4.81355 24.5644 2.92767 22.5014C1.04179 20.4383 -0.000543002 17.7676 2.12215e-07 15C2.12215e-07 14.6685 0.134623 14.3505 0.374253 14.1161C0.613883 13.8817 0.93889 13.75 1.27778 13.75Z" />
                                </svg>
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