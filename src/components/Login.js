import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { withRouter } from 'react-router-dom';
import { Dropdown } from "primereact/dropdown";
import { handleSetAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    const userId = e.target.value;

    const { dispatch, history } = this.props;

    dispatch(handleSetAuthedUser(userId));
    // console.log('handleLogin location = ', location);
    // history.push(location.state.from || '/');
    history.push('/home');
  };

  render() {
    return (
      <Card
        className='login'
        title='Log in'
        subTitle='Please select your username to log in...'
      >
        <Dropdown options={this.props.usernames} onChange={this.handleLogin} />
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  const { authedUser, users } = state;
  const { dispatch } = props;
  return {
    authedUser,
    usernames: Object.keys(users),
    dispatch,
    // history,
    // location
  };
}

export default withRouter(connect(mapStateToProps)(Login));
