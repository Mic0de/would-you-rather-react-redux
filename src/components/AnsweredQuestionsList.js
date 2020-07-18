import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionPreview from "./QuestionPreview";

class AnsweredQuestionsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.questions.map((q) => (
            <QuestionPreview key={q.id} questionId={q.id} />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { questions, authedUser } = state;
  return {
    authedUser,
    questions: Object.entries(questions)
      .filter(
        ([qk, qv]) =>
          qv["optionOne"].votes.includes(authedUser) ||
          qv["optionTwo"].votes.includes(authedUser)
      )
      .map(([qk, qv]) => qv)
      .sort((qv, qv2) => qv2.timestamp - qv.timestamp),
  };
}

export default connect(mapStateToProps)(AnsweredQuestionsList);
