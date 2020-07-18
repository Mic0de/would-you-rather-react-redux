import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionPreview from "./QuestionPreview";

class UnansweredQuestionsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.questions.map((qId) => (
            <QuestionPreview key={qId} questionId={qId} />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authedUser, questions } = state;
  return {
    authedUser,
    questions: Object.entries(questions)
      .filter(
        ([qk, qv]) =>
          !qv["optionOne"].votes.includes(authedUser) &&
          !qv["optionTwo"].votes.includes(authedUser)
      )
      .sort(([qk, qv], [qk2, qv2]) => qv2.timestamp - qv.timestamp)
      .map(([qk, qv]) => qk),
  };
}

export default connect(mapStateToProps)(UnansweredQuestionsList);
