import { combineReducers } from "redux";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading";
import authedUser from "./authedUser";
import questions from "./questions";

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
