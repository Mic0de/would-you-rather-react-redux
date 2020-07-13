import React, { Component } from "react";
import { Card } from "primereact/card";
import { connect } from "react-redux";

class UserScoreCard extends Component {
  render() {
    return (
      <div>
        <Card
          key={this.props.user.id}
          title={`${this.props.user.name}`}
          className='p-grid question-box'
        >
          <div className='p-grid'>
            <div className='p-col-4'>
              <img
                key={`${this.props.user.id.concat("Avatar")}`}
                src={this.props.user.avatarURL}
                alt={`Avatar of ${this.props.user.name}`}
                className='user-card-avatar'
              />
            </div>
            <div className='p-col'>
              <div className='question-content '>
                <p>
                  Answered questions: {this.props.numberOfAnsweredQuestions}
                </p>
                <p>Created questions: {this.props.numberOfQuestionsCreated}</p>
                <p>Score:</p>
                <div className='user-score'>{this.props.score}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: props.user,
    score: props.user.questions.length + Object.keys(props.user.answers).length,
    numberOfQuestionsCreated: props.user.questions.length,
    numberOfAnsweredQuestions: Object.keys(props.user.answers).length,
  };
}
export default connect(mapStateToProps)(UserScoreCard);
