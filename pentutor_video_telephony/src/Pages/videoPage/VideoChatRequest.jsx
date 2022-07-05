import { connect } from "react-redux"



const VideoChatRequest = (props) => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="flex items-center justify-between max-w-6xl w-full gap-5">
                    <div className="flex-1 h-[400px] bg-gray-900 rounded-md">
                    </div>
                    <div className="flex-1">
                        <h3 className="text-center text-4xl mb-4 capitalize">{ props.video.video_chat?.name }</h3>
                        <div className="flex items-center gap-3 w-full justify-center">
                            <div  className="px-4 py-2 rounded-full bg-indigo-600 text-white cursor-pointer">Ask to Join</div>
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

}

export default connect(mapState, mapDispatch)(VideoChatRequest)