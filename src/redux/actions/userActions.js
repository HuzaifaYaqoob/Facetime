

import { SET_USER_MEDIA } from "../ActionTypes/UserTypes";

export const addUserMedia = (data, success, fail) => dispatch =>{
    dispatch({
        type : SET_USER_MEDIA,
        payload : {
            ...data
        }
    })
}