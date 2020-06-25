import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import { TabView, TabPanel } from "primereact/tabview";
import Home from "./Home";
import { connect } from "react-redux";
import Login from "./Login";

function handleLogout() {
  //TODO: Set Authed User to NULL (Dispatch action)
  //TODO: Redirect to Login or '/' ??
  console.log("Log out clicked!");
}
class Header extends Component {
  render() {
    return (
      <div>
        <Link to='/home' component={Home}>
          Home
        </Link>
        <Link to='/new'>New Question</Link>
        <Link to='/leaderboard'>Leader Board</Link>
        <Link onClick={handleLogout()}>Log Out</Link>
        logout? username?
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    // authedUser,
    // users,
    // loggedIn: authedUser !== undefined && authedUser !== null,
  };
}

export default connect(mapStateToProps)(Header);
