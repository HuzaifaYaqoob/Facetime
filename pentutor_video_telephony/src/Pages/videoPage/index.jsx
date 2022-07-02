import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Chat from "../../Components/ChatBox/Chat"
import ParticipantBlock from "../../Components/Participants/Participants"
import VideoStream from "../../Components/VideoStream/VideoStream"
import { addUserMedia } from "../../redux/actions/userActions"
import { AddToPinnedStream } from '../../redux/actions/stream'



const StreamPage = (props) => {
    const [permit, setPermit] = useState(false)
    console.log(props.user.stream)

    const get_user_medias = async () => {
        const stream_vid = await navigator.mediaDevices.getUserMedia({ video: true })
        const stream_aud = await navigator.mediaDevices.getUserMedia({ audio: true })

        setPermit(true)
        props.addUserMedia(
            {
                video_stream: stream_vid,
                audio_stream: stream_aud
            }
        )
        props.AddToPinnedStream(
            {
                stream: stream_vid
            }
        )
    }

    useEffect(() => {
        get_user_medias()
    }, [])
    return (
        <>
            {
                permit ?
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
                        <div>
                            loading.... permission required
                        </div>
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
    AddToPinnedStream: AddToPinnedStream
}
export default connect(mapState, mapDispatch)(StreamPage)