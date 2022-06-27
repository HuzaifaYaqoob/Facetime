import Chat from "../../Components/ChatBox/Chat"
import VideoStream from "../../Components/VideoStream/VideoStream"



const StreamPage = (props) => {
    return (
        <>
            <div className="flex items-stretch justify-between p-4 min-h-screen max-h-screen overflow-hidden h-screen gap-4">
                <VideoStream />
                <Chat />
            </div>
        </>
    )
}

export default StreamPage