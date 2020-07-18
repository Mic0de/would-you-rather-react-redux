import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { Link, withRouter } from "react-router-dom";

class QuestionPreview extends Component {
  handleViewResults = (event, id) => {
    event.preventDefault();

    this.props.history.push(`${id}`);
  };
  render() {
    return (
      <Card
        title={`${this.props.currentAuthor.name} says...`}
        subTitle='Would You Rather ...'
        className='p-grid question-box'
      >
        {" "}
        <br />
        <div
          key={`${this.props.currentAuthor.id} + ${this.props.question.id}`}
          className='p-grid'
        >
          <div className='p-col-4'>
            <img
              key={`${this.props.question.id.concat("Avatar")}`}
              src={this.props.currentAuthor.avatarURL}
              alt={`Avatar of ${this.props.currentAuthor.id}`}
              className='question-avatar '
            />
          </div>
          <div>
            <ul>
              <li>{this.props.question.optionOne.text}</li>
              <li>{this.props.question.optionTwo.text}</li>
            </ul>
            <Link to={`questions/${this.props.questionId}`}>
              <p>View</p>
            </Link>
          </div>
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  const id =
    props.match && props.match.params.id
      ? props.match.params.id
      : props.questionId;
  return {
    authedUser: state.authedUser,
    questionId: id,
    question: state.questions[id],
    currentAuthor: state.users[state.questions[id].author],
    answered:
      state.questions[id].optionOne.votes.includes(state.authedUser) ||
      state.questions[id].optionTwo.votes.includes(state.authedUser),
  };
}

export default withRouter(connect(mapStateToProps)(QuestionPreview));
