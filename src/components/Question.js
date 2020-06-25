import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Link, withRouter, BrowserRouter as Route } from "react-router-dom";
import  QuestionResults  from './QuestionResults';

class Question extends Component {
  handleViewResults = (event, id) => {
    event.preventDefault();

    this.props.history.push(`${id}/results`);
  };
  render() {
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
                  <div>
                    <ul key={this.props.question.id}>
                      <li key={this.props.question.id.concat("optionOne")}>
                        <RadioButton
                          key={this.props.question.id.concat("optionOne")}
                          id={this.props.question.id.concat("optionOne")}
                          value='optionOne'
                          checked={this.props.optionChosen === "optionOne"}
                        />

                        <label
                          htmlFor={this.props.question.id.concat("optionOne")}
                          className='p-radiobutton-label'
                        >
                          {this.props.question.optionOne.text}
                        </label>
                      </li>
                      <br />
                      <li key={this.props.question.id.concat("optionTwo")}>
                        <RadioButton
                          key={this.props.question.id.concat("optionTwo")}
                          value='optionTwo'
                          checked={this.props.optionChosen === "optionTwo"}
                        />
                        <label
                          htmlFor={this.props.question.id.concat("optionTwo")}
                          className='p-radiobutton-label'
                        >
                          {this.props.question.optionTwo.text}
                        </label>
                      </li>
                    </ul>
                    <Button label='Submit' />
                  </div>
                ) : (
                  <div>
                    <ul>
                      <li>{this.props.question.optionOne.text}</li>
                      <li>{this.props.question.optionTwo.text}</li>
                    </ul>
                    {/* <Button
                      label='View Results'
                      onClick={(e) =>
                        this.handleViewResults(e, this.props.questionid)
                      }
                    /> */}
                    {/* <Button> */}
                      <Link to={`/questions/${this.props.questionId}/results`} >
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
  const id = props.match ? props.match.params.id : props.questionId;
  return {
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
