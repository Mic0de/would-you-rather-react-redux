import { combineReducers } from "redux";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading";
import authedUser from "./authedUser";

export default combineReducers({
  authedUser,
  users,
  loadingBar: loadingBarReducer,
});
