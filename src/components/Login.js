import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { handleSetAuthedUser } from "../actions/authedUser";

class Login extends Component {
  handleLogin = (e) => {
    const userId = e.target.value;

    const { dispatch } = this.props;

    dispatch(handleSetAuthedUser(userId));
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

function mapStateToProps(state) {
  const { authedUser, users } = state;
  console.log("**Login.js state:", state);
  return {
    authedUser,
    usernames: Object.keys(users),
  };
}

export default connect(mapStateToProps)(Login);
