

import Cookies from 'js-cookie'

import { CREATE_VIDEO_CHAT, GET_VIDEO_CHAT, SHOW_VIDEO_STREAM, VIDEO_CHAT_NOT_FOUND, VIDEO_MODEL_TOGGLE } from "../ActionTypes/VideoTypes"
import BaseURL, { create_new_video_meeting, get_video_chat } from "../ApiVariables"



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
            else {
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

export const createNewVideoMeeting = (data, success, fail) => dispatch => {
    let s_code;

    fetch(
        BaseURL + create_new_video_meeting,
        {
            method : 'POST',
            headers: {
                Authorization: `Token ${Cookies.get('auth_token')}`
            }
        }
    )
        .then(response => {
            s_code = response.status
            if (response.ok) {
                return response.json()
            }
        })
        .then(result => {
            if (s_code == 201) {
                dispatch(
                    {
                        type: CREATE_VIDEO_CHAT,
                        payload: {
                            data: result.response.data
                        }
                    }
                )
                success && success(result.response.data)
            }
            else {
                fail && fail()
            }
        })
        .catch(error => {
            fail && fail()
            console.log('CREATE VIDEO CHAT ERROR :: ', error)
        })
}