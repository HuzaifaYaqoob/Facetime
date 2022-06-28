

import { connect } from "react-redux"
import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"

const VideoStream = (props) => {
    return (
        <>
            <div className="w-full flex-1 flex flex-col gap-4">
                
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

}

export default connect(mapStateToProps, mapDispatchToProps)(VideoStream)