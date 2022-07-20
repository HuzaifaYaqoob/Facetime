import { useEffect, useRef } from "react"
import { connect } from "react-redux"



const AudioBlock = ({ user_part }) => {
    const rm_aud = useRef(null)

    useEffect(() => {
        if (rm_aud.current) {
            rm_aud.current.srcObject = user_part.stream
            rm_aud.current.play()
        }
    }, [rm_aud.current])

    return (
        <audio controls ref={rm_aud} className='hidden'></audio>
    )

}


const ParticipantAudioComp = (props) => {
    return (
        <>
            {
                props.connection.connections.length > 0 &&
                props.connection.connections.map((cnctn, index) => {
                    return (
                        <AudioBlock user_part={cnctn} key={index} />
                    )
                })
            }
        </>
    )
}



const mapState = state => {
    return state
}

const mapDispatch = {

}

export default connect(mapState, mapDispatch)(ParticipantAudioComp)