import { GET_VIDEO_CHAT, SHOW_VIDEO_STREAM, VIDEO_CHAT_NOT_FOUND, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"


const initialState = {
    video: false,
    video_stream: null, // active video stream
    stream_type: null,
    video_chat: undefined
}


const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEO_CHAT:
            return {
                ...state,
                video_chat: action.payload.data
            }

        case VIDEO_CHAT_NOT_FOUND:
            return {
                ...state,
                video_chat: undefined,
            }
        case SHOW_VIDEO_STREAM:
            return {
                ...state,
                video: true,
                video_stream: action.payload.stream,
                stream_type: action.payload.stream_type
            }
        case VIDEO_MODEL_TOGGLE:
            return {
                ...state,
                video: action.payload.mode,
                video_stream: !action.payload.mode ? null : state.video_stream,
                stream_type: !action.payload.mode ? null : state.stream_type,
            }
        default:
            return state
    }
}

export default VideoReducer