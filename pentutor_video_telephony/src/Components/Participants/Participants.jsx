import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { SidebarHeader } from "../ChatBox/Chat"



const User = ({ user_part, ...props }) => {
    console.log(user_part)
    const rm_vid = useRef(null)
    const rm_aud = useRef(null)

    useEffect(() => {
        if (rm_vid.current) {

            rm_vid.current.srcObject = user_part.stream
            rm_vid.current.play()
        }
    }, [rm_vid.current])

    useEffect(() => {
        if (rm_aud.current) {
            rm_aud.current.srcObject = user_part.stream
            rm_aud.current.play()
        }
    }, [rm_aud.current])

    return (
        <>
            <div className="w-full bg-gray-200 mb-3 rounded-md cursor-pointer py-3 flex items-center justify-center flex-col">
                {
                    user_part.stream &&
                        user_part.stream.getVideoTracks().length > 0 &&
                        user_part.stream.getVideoTracks().find(trc => trc.enabled) ?
                        <>
                            <video ref={rm_vid} className='h-[200px] w-[200px]' />
                            <audio controls ref={rm_aud} className='hidden'></audio>
                        </>
                        :
                        <div className="h-[130px] w-[130px] rounded-full text-white flex items-center justify-center text-5xl relative border-2 border-white bg-center bg-cover bg-no-repeat bg-gray-600">
                            {user_part.user.username[0]}
                        </div>
                }
                <p className="">{user_part.user.username}</p>
            </div>
        </>
    )
}


const ParticipantBlock = (props) => {
    console.log(props.connection.connections)
    return (
        <>
            <div className="min-w-[400px] max-w-[400px] bg-[#eef2f8] rounded-3xl p-3 flex flex-col gap-3">
                <SidebarHeader text={'Participants'} />
                <div className="flex-1 overflow-auto">
                    <div className="pr-3">
                        {
                            props.connection.connections.length > 0 &&
                            props.connection.connections.map(cnctn => {
                                return (
                                    <User user_part={cnctn} {...props} />
                                )
                            })
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