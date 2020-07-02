import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../css/App.css";
import Header from "./Header";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import Question from "./Question";
import QuestionResults from "./QuestionResults";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authedUser !== null ? <Component {...props} /> :  <Login/> 
      }
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

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
                <PrivateRoute
                  path='/new'
                  exact
                  component={NewQuestion}
                  authedUser={this.props.authedUser}
                />
                <PrivateRoute
                  path='/leaderboard'
                  exact
                  component={Leaderboard}
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
function mapStateToProps(state, props) {
  const { users, authedUser, questions } = state;
  // const {id} = props.location.search; //match.params;
  return {
    authedUser,
    loading: users === {} && questions === {},
    users,
    // id
  };
}

export default withRouter(connect(mapStateToProps)(App));
