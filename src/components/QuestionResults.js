import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";

class QuestionResults extends Component {
  render() {
    return (
      // <Link to={`/questions/`}
    //   <Route path='/questions/:id/results'>
        <div>
          <h1>Question Results Component!</h1>
        </div>
    //   </Route>
    );
  }
}

const mapStateToProps = (state, props) => 
{

    console.log('QuestionResults.js ** state = ', state);    
    console.log('QuestionResults.js ** props = ', props);    
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResults);
