import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleSetAuthedUser } from "../actions/authedUser";
import { Button } from "primereact/button";


class Header extends Component {
  handleLogout = (e) => {
    e.preventDefault()

    const { dispatch, history }= this.props;

    dispatch(handleSetAuthedUser(null));

    history.push('/');
  };
  render() {
    return (
      <Fragment>
      <span className='header-options'>
        <Link to='/home'>&nbsp;Home&nbsp;</Link>
        <Link to='/new'>&nbsp;  New Question &nbsp; </Link>
        <Link to='/leaderboard'>&nbsp;Leader Board&nbsp;</Link>
        
      {/* </span> */}

        {this.props.authedUser !== null ? (
          // <div className='user-logged-in-header'>
          <Fragment>
            <img
              src= {this.props.currentUser.avatarURL}
              alt={`Avatar of ${this.props.currentUser.id}`}
              className='small-avatar '
            />
            <p>{`${this.props.currentUser.name}`}</p>
            <Button onClick={this.handleLogout} label='Log Out' className='logout-button'/>
          {/* // </div> */}
          </Fragment>
        ) : null}
        </span>
        </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users }, props) {
  
  const { dispatch, history, location } = props;
  return {
    authedUser,
    currentUser: authedUser !== null ? users[authedUser] : null,
    dispatch,
    history,
    location
  };
}

export default withRouter(connect(mapStateToProps)(Header));
