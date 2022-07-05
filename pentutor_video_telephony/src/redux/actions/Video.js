import { SHOW_VIDEO_STREAM, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"
import BaseURL, { get_video_chat } from "../ApiVariables"



export const ToggleVideoMode = (data, success, fail) => dispatch => {
    dispatch({
        type: VIDEO_MODEL_TOGGLE,
        payload: {
            ...data
        }
    })
    success && success()
}

export const add_video_to_stream = (data, success, fail) => dispatch => {
    dispatch({
        type: SHOW_VIDEO_STREAM,
        payload: {
            ...data
        }
    })
}

export const GetVideoChat = (data, success, fail) => dispatch => {
    let s_code;

    fetch(
        BaseURL + get_video_chat
    )
        .then(response => {
            s_code = response.status
            if (response.ok) {
                return response.json()
            }
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log('GET VIDEO CHAT ERROR :: ', error)
        })
}