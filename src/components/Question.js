import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { withRouter } from "react-router-dom";
import { handleSetAnswerQuestion } from "../actions/questions";
import QuestionResults from "./QuestionResults";
import ErrorPage from "./ErrorPage";

class Question extends Component {
  handleAnswerQuestion = (e) => {
    e.preventDefault();

    this.props.dispatch(
      handleSetAnswerQuestion(this.props.questionId, this.state.chosenOption)
    );
  };

  constructor() {
    super();
    this.state = {
      chosenOption: null,
    };
  }
  render() {
    if (this.props.pageNotFound) {
      return <ErrorPage />;
    }
    return (
      <Card
        title={`${this.props.currentAuthor.name} says...`}
        subTitle='Would You Rather ...'
        className='p-grid question-box'
      >
        {this.props.answered === false ? (
          <Fragment>
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
                <div className='question-content '>
                  <form onSubmit={this.handleAnswerQuestion}>
                    <RadioButton
                      name='optionSelect'
                      key={this.props.question.id.concat("optionOne")}
                      id={this.props.question.id.concat("optionOne")}
                      value='optionOne'
                      onChange={(e) => this.setState({ chosenOption: e.value })}
                    />
                    <label
                      htmlFor={this.props.question.id.concat("optionOne")}
                      className='p-radiobutton-label'
                    >
                      {this.props.question.optionOne.text}
                    </label>
                    <br />
                    <RadioButton
                      name='optionSelect'
                      key={this.props.question.id.concat("optionTwo")}
                      value='optionTwo'
                      onChange={(e) => this.setState({ chosenOption: e.value })}
                    />
                    <label
                      htmlFor={this.props.question.id.concat("optionTwo")}
                      className='p-radiobutton-label'
                    >
                      {this.props.question.optionTwo.text}
                    </label>
                    <br />
                    <br />
                    <Button
                      label='Submit'
                      type='submit'
                      disabled={this.state.chosenOption === null}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <QuestionResults
              key={this.props.questionId}
              questionId={this.props.questionId}
            />
          </Fragment>
        )}
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  const id =
    props.match && props.match.params.id
      ? props.match.params.id
      : props.questionId;
  const { authedUser, questions, users } = state;
  let pageNotFound = false;
  if (!questions[id]) {
    pageNotFound = true;
  }
  return {
    authedUser,
    questionId: id,
    question: questions[id],
    currentAuthor: questions[id] && users[questions[id].author],
    answered:
      (questions[id] && questions[id].optionOne.votes.includes(authedUser)) ||
      (questions[id] && questions[id].optionTwo.votes.includes(authedUser)),
    pageNotFound,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
