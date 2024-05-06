import authReducer from "../slices/authSlice";
import adminReducer from "../slices/adminSlice";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
    auth:authReducer,
    admin:adminReducer
})
export default rootReducer;