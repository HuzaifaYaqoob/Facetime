import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { SidebarHeader } from "../ChatBox/Chat"



const User = ({ user_part, ...props }) => {
    console.log(user_part.user.type, ' ', user_part.stream.getVideoTracks())
    const rm_vid = useRef(null)

    useEffect(() => {
        if (rm_vid.current) {
            user_part.stream.getVideoTracks().forEach(element => {
                console.log(element.enabled)
            })
            rm_vid.current.srcObject = user_part.stream
            rm_vid.current.play()
        }
    }, [rm_vid.current])

    return (
        <>
            <div className="w-full bg-gray-900 mb-3 relative max-h-[240px] overflow-hidden rounded-md cursor-pointer py-3 flex items-center justify-center flex-col">
                {
                    user_part.stream &&
                        user_part.stream.getVideoTracks().length > 0 &&
                        user_part.stream.getVideoTracks().find(trc => trc.enabled && trc.enabled != 0) ?
                        <>
                            <video ref={rm_vid} muted className='h-auto w-auto max-w-full max-h-full' autoPlay />
                        </>
                        :
                        <div className="h-[130px] w-[130px] rounded-full text-white flex items-center justify-center text-5xl relative border-2 border-white bg-center bg-cover bg-no-repeat bg-gray-600">
                            {user_part.user.username[0]}
                        </div>
                }
                <p className={`${user_part.stream?.getVideoTracks()?.find(trc => trc.enabled) ? 'absolute top-0 left-0 right-0 py-2 px-2 text-white bg-black/50 backdrop-blur-sm' : 'static'}`}>
                    {user_part.user.username}{user_part.user.type == 'SCREEN' && ' - Screen Sharing'}
                </p>
            </div>
        </>
    )
}


const ParticipantBlock = (props) => {
    return (
        <>
            <div className="min-w-[400px] max-w-[400px] bg-[#eef2f8] rounded-3xl p-3 flex flex-col gap-3">
                <SidebarHeader text={'Participants'} />
                <div className="flex-1 overflow-auto">
                    <div className="pr-3">
                        {
                            props.connection.connections.filter(cnt => cnt.stream).length > 0 ?
                                props.connection.connections.filter(cnt => cnt.stream).map((cnctn, index) => {
                                    return (
                                        <User user_part={cnctn} {...props} key={index} />
                                    )
                                })
                                :
                                <div className="text-center">
                                    <p className="text-gray-500">No Participant</p>
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

}

export default connect(mapState, mapDispatch)(ParticipantBlock)