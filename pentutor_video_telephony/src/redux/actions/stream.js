import { SET_PINNED_STREAM } from "../ActionTypes/streamTypes"


export const AddToPinnedStream = (data, success, fail) => dispatch =>{
    dispatch(
        {
            type : SET_PINNED_STREAM,
            payload : {
                ...data
            }
        }
    )
}