import { combineReducers } from "redux";
import AuthReducer from "./auth/authReducer";
import MasterReducer from "./master/masterReducer";

export default combineReducers({
  master: MasterReducer,
  auth: AuthReducer
});
