import React, { Component } from "react";
import { connect } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import AnsweredQuestionsList from "./AnsweredQuestionsList";
import UnansweredQuestionsList from "./UnansweredQuestionsList";

class Home extends Component {
  render() {
    return (
      <div>
        <TabView className='home-tab-view'>
          <TabPanel header='Unanswered Questions' className='home-tab'>
            <UnansweredQuestionsList />
          </TabPanel>
          <TabPanel header='Answered Questions' className='home-tab'>
            <AnsweredQuestionsList />
          </TabPanel>
        </TabView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authedUser } = state;
  return { authedUser };
}

export default connect(mapStateToProps)(Home);
