import React, { Component } from "react";
import { connect } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import { AnsweredQuestionsList } from "./AnsweredQuestionsList";
import { UnansweredQuestionsList } from "./UnansweredQuestionsList";

export class Home extends Component {
    // state={
    //     authedUser : this.props.authedUser,
    // }
  render() {
      console.log("Home this = ", this)
      console.log("Home authedUser = ", this.props.authedUser)
    return (
      <div>
          <p>Welcome HOME user = {this.props.authedUser}</p>
        <TabView className='home-tab-view'>
          <TabPanel header='Answered Questions' className='home-tab'>
            <AnsweredQuestionsList />
          </TabPanel>
          <TabPanel header='Unanswered Questions' className='home-tab'>
            <UnansweredQuestionsList />
          </TabPanel>
        </TabView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authedUser } = state.authedUser;
  console.log("**Home.js state:", state);
    return {
     authedUser
      
    }
  };


export default connect(mapStateToProps)(Home);
