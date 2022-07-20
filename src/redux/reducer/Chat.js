import { CHAT_NEW_MESSAGE } from "../ActionTypes/Chat"




const initialState = {
    chat_list: []
}

export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_NEW_MESSAGE:
            return {
                ...state,
                chat_list: [
                    ...state.chat_list,
                    action.payload
                ]
            }
        default:
            return state
    }
}