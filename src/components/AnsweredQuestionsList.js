import React, { Component } from "react";
import { connect } from "react-redux";
import Question from './Question';

class AnsweredQuestionsList extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>{JSON.stringify(this.props.questions)}</li>
          {this.props.questions.map((qId) => (
            <Question key={qId} questionId={qId} />
          ))}
        </ul>
      </div>
    );
  }
}
/**
 * Example question
 * {{"8xf0y6ziyjabvozdd253nd":
 *  {"id":"8xf0y6ziyjabvozdd253nd","author":"sarahedo","timestamp":1467166872634,"optionOne":{"votes":["sarahedo"],"text":"have horrible short term memory"},"optionTwo":{"votes":[],"text":"have horrible long term memory"}}} state
 */
function mapStateToProps(state) {
  const { questions, authedUser } = state;
  return {
    authedUser,
    questions: (Object.entries(questions).filter(
      ([qk, qv]) =>
        qv["optionOne"].votes.includes(authedUser) ||
        qv["optionTwo"].votes.includes(authedUser)
    )).map(([qk,qv]) => qk),
  };
}

export default connect(mapStateToProps)(AnsweredQuestionsList);
