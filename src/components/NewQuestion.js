import React, { Component } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends Component {
  handleNewQuestion = (e) => {
    e.preventDefault();

    this.props.dispatch(
      handleAddQuestion(this.state.optionOneText, this.state.optionTwoText)
    );

    this.props.history.push("/home");
  };

  constructor() {
    super();
    this.state = {
      optionOneText: null,
      optionTwoText: null,
    };
  }

  render() {
    return (
      <div>
        <Card
          className='new-question-card'
          title='Add A New Question'
          subTitle='Would you rather...'
        >
          <form onSubmit={this.handleNewQuestion}>
            <span className='p-float-label'>
              <InputText
                id='new-question-option-one'
                value={this.state.value}
                onChange={(e) =>
                  this.setState({ optionOneText: e.target.value })
                }
              />
              <label htmlFor='new-question-option-one'>Option One</label>
            </span>
            <span className='p-float-label'>
              <p> or </p>
              <InputText
                id='new-question-option-two'
                value={this.state.value}
                onChange={(e) =>
                  this.setState({ optionTwoText: e.target.value })
                }
              />
              <label htmlFor='new-question-option-two'>Option Two</label>
            </span>

            <Button
              label='Add'
              type='submit'
              disabled={
                this.state.optionOneText === null ||
                this.state.optionTwoText === null
              }
            />
          </form>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    authedUser: state.authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
