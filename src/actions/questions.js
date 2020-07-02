import { showLoading, hideLoading } from "react-redux-loading";
import {
  formatQuestion,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function answerQuestion(questions, users) {
  console.log('questions', questions)
  console.log('users', users)

  console.groupEnd();
  return {
    type: ANSWER_QUESTION,    
    questions,
    users,
  };
}

export function handleSetAnswerQuestion(qid, answer) {
  // console.log('authedUser', authedUser)
 
  console.log('qid', qid)
  console.log('answer', answer)
  return (dispatch, getState) => {
    const  {authedUser}  = getState();
    console.log('authedUser from state', authedUser)
    console.log('getState()', getState())
    console.log('getState().authedUser', getState().authedUser)
    dispatch(showLoading());
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer}
    )
      .then((questions, users) =>
        dispatch(answerQuestion(questions, users))
      )
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
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
