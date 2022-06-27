

import { combineReducers } from "redux";


import UserReducer from "./reducer/User";
import UtilityReducer from "./reducer/Utility";

export default combineReducers({
    User : UserReducer,
    utility : UtilityReducer
})