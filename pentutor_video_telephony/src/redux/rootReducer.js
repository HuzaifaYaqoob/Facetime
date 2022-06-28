

import { combineReducers } from "redux";


import UserReducer from "./reducer/User";
import UtilityReducer from "./reducer/Utility";
import VideoReducer from "./reducer/Video";

export default combineReducers({
    User : UserReducer,
    utility : UtilityReducer,
    video : VideoReducer
})