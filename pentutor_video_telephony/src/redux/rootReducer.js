

import { combineReducers } from "redux";


import UserReducer from "./reducer/User";

export default combineReducers({
    User : UserReducer
})