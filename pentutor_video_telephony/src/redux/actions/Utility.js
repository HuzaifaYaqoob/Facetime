

import { MAKE_ACTIVE_TAB } from "../ActionTypes/UtilityTypes"

export const MakeActiveTab = (data, success, fail) => dispatch => {
    dispatch({
        type: MAKE_ACTIVE_TAB,
        payload: {
            tab: data.tab
        }
    })
    success && success()
}