import { showLoading, hideLoading } from "react-redux-loading";
import {
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

function addQuestion(question, authedUser) {
  return {
    type: ADD_QUESTION,
    question,
    authedUser,
  };
}

export function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    qid,
    answer,
    authedUser,
  };
}

export function handleSetAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => dispatch(answerQuestion(authedUser, qid, answer)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question, authedUser)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
