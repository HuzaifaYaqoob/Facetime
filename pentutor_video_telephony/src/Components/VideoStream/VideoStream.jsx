

import { useEffect } from "react"
import { connect } from "react-redux"
import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"
import BaseURL, { video_websocket_url, wsBaseURL } from "../../redux/ApiVariables"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"
import { AddActiveVideoSocket } from "../../redux/actions/socket"

const VideoStream = (props) => {
    const params = useParams()
    return (
        <>
            <div className="w-full flex-1 flex flex-col gap-2 md:gap-4">
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