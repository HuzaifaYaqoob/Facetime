

import MenuBlock from "./BottomMenu"
import VideoBlock from "./VideoBlock"

const VideoStream = () => {
    return (
        <>
            <div className="w-full flex-1 flex flex-col gap-4">
                <VideoBlock />
                <MenuBlock />
            </div>
        </>
    )
}

export default VideoStream