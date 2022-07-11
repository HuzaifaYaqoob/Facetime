import { ADD_RTCP_CONNECTION, REQUEST_FULFILLED, SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


export const AddToPinnedStream = (data, success, fail) => dispatch => {
    dispatch(
        {
            type: SET_PINNED_STREAM,
            payload: {
                ...data
            }
        }
    )
}

export const AddRTCPConnection = (data, success, fail) => dispatch => {
    dispatch({
        type: ADD_RTCP_CONNECTION,
        payload: {
            connection: data.connection
        }
    })
}

export const RequestFulfilled = (data, success, fail) => dispatch => {
    dispatch({
        type: REQUEST_FULFILLED,
    })
}