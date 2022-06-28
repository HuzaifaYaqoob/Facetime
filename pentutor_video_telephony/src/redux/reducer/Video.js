import { SHOW_VIDEO_STREAM, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"


const initialState = {
    video : false,
    video_stream : null,
}


const VideoReducer = (state = initialState , action) => {
    switch(action.type){
        case SHOW_VIDEO_STREAM:
            return {
                ...state,
                video : true,
                video_stream : action.payload.stream
            }
        case VIDEO_MODEL_TOGGLE:
            return {
                ...state,
                video : action.payload.mode,
                video_stream : !action.payload.mode ? null : state.video_stream 
            }
        default :
            return state
    }
}

export default VideoReducer