import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../css/App.css";
import Header from "./Header";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import { ProgressSpinner } from "primereact/progressspinner";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { handleSetAuthedUser } from "../actions/authedUser";
import Question from "./Question";
import QuestionResults from "./QuestionResults";

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => {
  console.log("***PrivateRoute authedUser = ", authedUser);
  const props = { ...rest };
  return (
    <Route
      {...rest}
      render={(props) =>
        authedUser !== null ? <Component {...props} /> :  <Login/> //<Redirect to='/' />
      }
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  handleLogin = (e) => {
    const userId = e.target.value;
    const { dispatch, history, location } = this.props;

    dispatch(handleSetAuthedUser(userId));

    history.push(location.state.from || '/');
  };
  render() {
    return (
      <Router>
        <div className='App'>
          {/* <header className='header-options'> */}
            <Header />
          {/* </header> */}

          <LoadingBar className='loading-bar' />
          <div className='container'>
            <Fragment>
              <Switch>
                <Route path='/' exact component={Login} />
                <PrivateRoute
                  path='/questions/:id'
                  exact
                  component={Question}
                  authedUser={this.props.authedUser}
                />
                <PrivateRoute
                  path='/questions/:id/results'
                  exact
                  component={QuestionResults}
                  authedUser={this.props.authedUser}
                />
                <PrivateRoute
                  path='/home'
                  exact
                  component={Home}
                  authedUser={this.props.authedUser}
                />
              </Switch>
            </Fragment>
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
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state, handleLogin) {
  const { users, authedUser, questions } = state;
  console.log("**App.js state:", state);
  return {
    authedUser,
    loading: users === {} && questions === {},
    users,
  };
}

export default connect(mapStateToProps)(App);
