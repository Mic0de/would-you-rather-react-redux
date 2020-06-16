import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../css/App.css";
import Header from "./Header";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import { ProgressSpinner } from "primereact/progressspinner";
import { Home } from "./Home";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import {handleSetAuthedUser} from '../actions/authedUser';
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  state = {
    authedUser: this.props.authedUser
  }

  handleLogin = (e) => {
    const userId = e.target.value;

    const {dispatch} = this.props;

    dispatch(handleSetAuthedUser(userId));

    this.setState(()=>({
      authedUser: userId,
    }))
  }
  render() {
    console.log("App.js props = ", this.props);
    return (
      <Router>
      <div className='App'>
        <Fragment>
          <header className='header-options'>
            <Header />
          </header>
          <LoadingBar className='loading-bar' />
          <div className='container'>
            {this.props.loading === true ? (
              // <ProgressSpinner strokeWidth='4'/>
              <h1>Loading...</h1>
            ) : (this.props.authedUser === null || this.props.authedUser === undefined )? (
              <Login />
            ) : (
              <div>
              <p>App.js user =  {this.props.authedUser}</p>
              <Route path='/' exact component={Home} />
              {/* <Home authedUser={this.props.authedUser} /> */}
              </div>
            )}
          </div>

          <footer className='footer'>
            <div>
              Icons made by{" "}
              <a
                href='https://www.flaticon.com/authors/freepik'
                title='Freepik'
              >
                Freepik
              </a>{" "}
              from{" "}
              <a href='https://www.flaticon.com/' title='Flaticon'>
                www.flaticon.com
              </a>
            </div>
          </footer>
        </Fragment>
      </div>
      </Router>
    );
  }
}
function mapStateToProps(state, handleLogin) {

  const { users, authedUser } = state;
  console.log("**App.js state:", state);
  return {
    authedUser,
    loading: users === {},
    users,
  };
}

export default connect(mapStateToProps)(App);
