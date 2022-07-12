import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { SidebarHeader } from "../ChatBox/Chat"



const User = (props) => {
    const rm_vid = useRef(null)

    useEffect(() => {
        if (rm_vid.current) {
            rm_vid.current.srcObject = props.stream.remote.stream
            rm_vid.current.play()
        }
    }, [rm_vid.current])
    return (
        <>
            <div className="w-full bg-gray-200 mb-3 rounded-md cursor-pointer py-3 flex items-center justify-center flex-col">
                <div className="h-[130px] w-[130px] rounded-full text-white flex items-center justify-center text-5xl relative border-2 border-white bg-center bg-cover bg-no-repeat bg-gray-600">
                    H
                </div>
                <video ref={rm_vid} className='h-[200px] w-[200px]'>

                </video>
                <p className="">Saira Huzaifa</p>
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
                            props.stream.remote.stream?.getTracks().length > 0 &&
                            <User {...props} />
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