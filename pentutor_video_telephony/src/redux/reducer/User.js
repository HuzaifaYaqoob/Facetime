


import { SET_USER_MEDIA } from "../ActionTypes/UserTypes"

const initialState = {
    profile : {
        first_name : 'Huzaifa',
        last_name : 'Yaqoob'
    },
    is_authenticated : false,
    access_token : undefined,
    stream : {
        media : null
    }
}


const UserReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_USER_MEDIA:
            return {
                ...state,
                stream : {
                    ...state.stream,
                    media : action.payload.media
                }
            }
        default:
            return state
    }
}

export default UserReducer