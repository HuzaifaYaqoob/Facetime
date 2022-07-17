

import { useEffect } from "react"
import { connect } from "react-redux"
import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"
import BaseURL, { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"
import ParticipantAudioComp from './ParticipantsAudio'
import { JoinVideoChatParticipants } from "../../Constants/VideoChats/VideoChat"


const VideoStream = (props) => {
    const params = useParams()

    useEffect(() => {
        if (props.connection.connections.length < 1 && props.user.stream.video_stream && props.user.stream.audio_stream) {
            JoinVideoChatParticipants(
                {},
                () => {
                }
            )
        }
    }, [props.user.stream.video_stream, props.user.stream.audio_stream])
    return (
        <>
            <div className="w-full flex-1 flex flex-col gap-2 md:gap-4">
                <ParticipantAudioComp />
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