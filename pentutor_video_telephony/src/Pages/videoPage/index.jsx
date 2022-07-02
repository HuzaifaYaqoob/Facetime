import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Chat from "../../Components/ChatBox/Chat"
import ParticipantBlock from "../../Components/Participants/Participants"
import VideoStream from "../../Components/VideoStream/VideoStream"
import { addUserMedia } from "../../redux/actions/userActions"
import { AddToPinnedStream } from '../../redux/actions/stream'



const StreamPage = (props) => {
    const [permit, setPermit] = useState(false)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setPermit(true)
            props.addUserMedia(
                {
                    stream: stream
                }
            )
            props.AddToPinnedStream(
                {
                    stream: stream
                }
            )

        })
            .catch(err => {
                setPermit(false)
            })
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