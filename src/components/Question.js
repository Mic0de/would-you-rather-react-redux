import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Link, withRouter } from "react-router-dom";
import QuestionResults from "./QuestionResults";
import { handleSetAnswerQuestion } from "../actions/questions";

class Question extends Component {
  handleViewResults = (event, id) => {
    event.preventDefault();

    this.props.history.push(`${id}/results`);
  };

  handleAnswerQuestion = (e) => {
     e.preventDefault();

    console.log("chosenOption state = ", this.state.chosenOption);
    console.log("id for question = ", this.props.questionId);
    console.log("answerQ authedUser = ", this.props.authedUser);
    this.props.dispatch(
      handleSetAnswerQuestion(
        this.props.questionId,
        this.state.chosenOption
      )
    );
  };

  constructor() {
    super();
    this.state = {
      chosenOption: null,
    };
  }
  render() {
    
  console.log('this.props.question.author', this.props.currentAuthor)
  console.log('this.props.currentAuthor', this.props.currentAuthor)
    return (
      <Card
        title={`${this.props.question.author} says...`}
        className='p-grid question-box'
      >
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
          <div className='p-col'>
            <div className='question-content '>
              {this.props.answered === false ? (
                <form onSubmit={this.handleAnswerQuestion}>
                  {/* <ul key={this.props.question.id}>                                   */}
                  {/* <li key={this.props.question.id.concat("optionOne")}> */}
                  <RadioButton
                    name='optionSelect'
                    key={this.props.question.id.concat("optionOne")}
                    id={this.props.question.id.concat("optionOne")}
                    value='optionOne'
                    onChange={(e) => this.setState({ chosenOption: e.value })}
                  />
                  {/* onChange={this.handleAnswerQuestion} */}
                  <label
                    htmlFor={this.props.question.id.concat("optionOne")}
                    className='p-radiobutton-label'
                  >
                    {this.props.question.optionOne.text}
                  </label>
                  {/* </li> */}
                  <br />
                  {/* <li key={this.props.question.id.concat("optionTwo")}> */}
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
                  {/* </li> */}
                  {/* </ul> */}
                  <Button
                    label='Submit'
                    type='submit'
                    disabled={this.state.chosenOption === null}
                  />
                </form>
              ) : (
                <div>
                  <ul>
                    <li>{this.props.question.optionOne.text}</li>
                    <li>{this.props.question.optionTwo.text}</li>
                  </ul>
                  <Link to={`/questions/${this.props.questionId}/results`}>
                    <p>View Results</p>
                  </Link>
                  {/* </Button> */}
                </div>
              )}
            </div>
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
    questionId: id, //questionId,
    question: state.questions[id], //questionId],
    currentAuthor: state.users[state.questions[id].author],
    // currentAuthor: state.users[state.questions[props.questionId].author],
    answered:
      state.questions[id].optionOne.votes.includes(state.authedUser) ||
      state.questions[id].optionTwo.votes.includes(state.authedUser), //props.answered,
  };
}

export default connect(mapStateToProps)(Question);
// export default withRouter(connect(mapStateToProps)(Question));
