import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import ErrorPage from "./ErrorPage";

class QuestionResults extends Component {
  render() {
    if (this.props.pageNotFound) {
      return <ErrorPage />;
    }
    return (
      <div>
        <i className='pi pi-star selected-option-badge' /> designates your vote.
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
                <div>
                  <ul key={this.props.question.id}>
                    <li key={this.props.question.id.concat("optionOne")}>
                      {this.props.currentUserSelectedOption === "optionOne" && (
                        <i
                          className='pi pi-star selected-option-badge'
                          label='Your Vote'
                        />
                      )}

                      <label
                        htmlFor={this.props.question.id.concat("optionOne")}
                        className='p-radiobutton-label'
                      >
                        {this.props.question.optionOne.text}
                      </label>
                      <ProgressBar
                        className='progres-bar-text'
                        value={
                          (this.props.optionOneVotes / this.props.totalVotes) *
                          100
                        }
                        displayValueTemplate={() =>
                          `${this.props.optionOneVotes} / ${
                            this.props.totalVotes
                          } (${
                            (this.props.optionOneVotes /
                              this.props.totalVotes) *
                            100
                          }%)`
                        }
                        unit=' '
                      />
                    </li>
                    <br />
                    <li key={this.props.question.id.concat("optionTwo")}>
                      {this.props.currentUserSelectedOption === "optionTwo" && (
                        <i className='pi pi-star selected-option-badge' />
                      )}
                      <label
                        htmlFor={this.props.question.id.concat("optionTwo")}
                        className='p-radiobutton-label'
                      >
                        {this.props.question.optionTwo.text}
                      </label>
                      <ProgressBar
                        className='progres-bar-text'
                        value={
                          (this.props.optionTwoVotes / this.props.totalVotes) *
                          100
                        }
                        displayValueTemplate={() =>
                          `${this.props.optionTwoVotes} / ${
                            this.props.totalVotes
                          } (${
                            (this.props.optionTwoVotes /
                              this.props.totalVotes) *
                            100
                          }%)`
                        }
                        unit=' '
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id =
    props.match && props.match.params.id
      ? props.match.params.id
      : props.questionId;
  const { authedUser, questions, users } = state;
  let pageNotFound = false;
  if (!questions[id]) {
    pageNotFound = true;
  }
  console.log("id", id);

  return {
    id,
    question: id && questions[id],
    authedUser,
    authedUserData: users[authedUser],
    currentAuthor: questions[id] && users[questions[id].author],
    optionOneVotes: questions[id] && questions[id].optionOne.votes.length,
    optionTwoVotes: questions[id] && questions[id].optionTwo.votes.length,
    totalVotes:
      questions[id] &&
      questions[id].optionOne.votes.length +
        questions[id].optionTwo.votes.length,
    currentUserSelectedOption:
      questions[id] && questions[id].optionOne.votes.includes(authedUser)
        ? "optionOne"
        : questions[id] && questions[id].optionTwo.votes.includes(authedUser)
        ? "optionTwo"
        : null,
    pageNotFound,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResults);
