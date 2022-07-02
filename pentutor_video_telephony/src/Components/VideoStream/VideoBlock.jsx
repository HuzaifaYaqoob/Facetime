import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { ToggleVideoMode } from "../../redux/actions/Video"


const VideoBlock = (props) => {
    const video_ref = useRef()

    useEffect(() => {
        if (video_ref && video_ref.current) {
            video_ref.current.srcObject = props.stream.pinned_stream
            video_ref.current.play()
        }
    }, [
        props.stream.pinned_stream,
        video_ref.current
    ])

    const is_vid_active = (props.stream.pinned_stream) && props.stream.pinned_stream.getVideoTracks()[0].enabled

    return (
        <>
            <div
                className="flex-1 bg-gray-200 rounded-3xl bg-center bg-cover bg-no-repeat overflow-hidden relative"
                style={{
                    // backgroundImage: 'url("https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHw0fHxibG9jayUyMGNoYWlufGVufDB8fHx8MTY1NTk2MTkzMw&ixlib=rb-1.2.1&q=80&w=1080")'
                }}
            >
                <div className="w-full h-full bg-gray-800 flex items-center justify-center p-4">
                    {
                        is_vid_active ?
                            <>
                                <video
                                    className="w-auto max-w-full h-auto max-h-full object-fill"
                                    muted
                                    ref={video_ref}
                                ></video>
                            </>
                            :
                            <>
                            </>
                    }
                    <div className={`${is_vid_active ? 'absolute top-5 left-5 flex items-center justify-start gap-2' : 'static'}`}>
                        <div className={`${is_vid_active ? 'w-[45px] h-[45px]' : 'w-[120px] h-[120px] mb-5'} transition-all rounded-full bg-gray-400 mx-auto `}>

                        </div>
                        <p className="text-white text-center text-xl">Huzaifa Yaqoob</p>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {
    ToggleVideoMode: ToggleVideoMode

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoBlock)