import { CHAT_NEW_MESSAGE } from "../ActionTypes/Chat"
import { MAKE_ACTIVE_TAB } from "../ActionTypes/UtilityTypes"





const initialState = {
    active_sidetab: undefined,
    loading: false,
    requesting: false,
    snack_bar: undefined,
    is_message: false
}


const UtilityReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_CHAT_NEW_MESSAGE':
            return {
                ...state,
                is_message: action.payload
            }
        case 'ADD_OR_REMOVE_SNACK_BAR':
            return {
                ...state,
                snack_bar: action.payload
            }
        case 'CHANGE_REQUESTING_STATUS':
            return {
                ...state,
                requesting: action.payload
            }
        case 'LOADER':
            return {
                ...state,
                loading: action.payload
            }
        case MAKE_ACTIVE_TAB:
            return {
                ...state,
                active_sidetab: action.payload.tab
            }
        default:
            return state
    }
}

export default UtilityReducer