import { _getUsers, _getQuestions } from "../utils/_DATA";
import { getInitialDataFromDB} from '../utils/api';
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";
import { handleSetAuthedUser } from "../actions/authedUser";

// const AUTHED_ID = null; //"sarahedo";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialDataFromDB().then(( {users, questions} ) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      // dispatch(handleSetAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
