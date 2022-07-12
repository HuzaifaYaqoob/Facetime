import { GET_USER, LOGIN_USER } from "../ActionTypes/Auth";
import BaseURL, { get_user_api, login_url } from "../ApiVariables";

import Cookies from 'js-cookie'


export const LoginHandler = (data, success, fail) => dispatch => {
    let s_code;

    let form_data = new FormData()

    for (let ky in data) {
        form_data.append(ky, data[ky])
    }

    fetch(
        BaseURL + login_url,
        {
            method: 'POST',
            body: form_data
        }
    )
        .then(response => {
            s_code = response.status
            if (response.ok) {
                return response.json()
            }
        })
        .then(result => {
            if (s_code === 200) {
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        data: result.user
                    }
                })
                success && success(result.user)
            }
        })
        .catch(err => {
            fail && fail()
        })
}

export const get_user = (data, success, fail) => dispatch => {
    let s_code;

    fetch(
        BaseURL + get_user_api,
        {
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
            if (s_code === 200) {
                dispatch({
                    type: GET_USER,
                    payload: {
                        data: result.response.user
                    }
                })
                success && success(result.response.user)
            }
        })
        .catch(err => {
            fail && fail()
        })
}