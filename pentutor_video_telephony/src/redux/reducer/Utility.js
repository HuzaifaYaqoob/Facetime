import { MAKE_ACTIVE_TAB } from "../ActionTypes/UtilityTypes"





const initialState = {
    active_sidetab : undefined
}


const UtilityReducer = (state = initialState, action) =>{
    switch(action.type){
        case MAKE_ACTIVE_TAB:
            return {
                ...state,
                active_sidetab : action.payload.tab
            }
        default:
            return state
    }
}

export default UtilityReducer