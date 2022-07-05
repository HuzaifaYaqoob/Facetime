import { GET_VIDEO_CHAT, SHOW_VIDEO_STREAM, VIDEO_CHAT_NOT_FOUND, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"
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
        BaseURL + get_video_chat + `?video_chat_id=${data.video_chat_id}`
    )
        .then(response => {
            s_code = response.status
            if (response.ok) {
                return response.json()
            }
        })
        .then(result => {
            if (s_code == 200) {
                dispatch(
                    {
                        type: GET_VIDEO_CHAT,
                        payload: {
                            data: result.response.data
                        }
                    }
                )
                success && success(result.response.data)
            }
            else{
                dispatch(
                    {
                        type: VIDEO_CHAT_NOT_FOUND,
                        payload: {}
                    }
                )
                fail && fail()
            }
        })
        .catch(error => {
            fail && fail()
            console.log('GET VIDEO CHAT ERROR :: ', error)
        })
}