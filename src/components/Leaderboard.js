import React, { Component } from "react";
import { connect } from "react-redux";
import UserScoreCard from "./UserScoreCard";

class Leaderboard extends Component {
  render() {
    return (
      <div>
        {this.props.users.map((u) => (
          <UserScoreCard user={u} key={u.id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const users = Object.entries(state.users)
    .map(([uk, uv]) => uv)
    .sort(
      (u1, u2) =>
        Object.keys(u2.answers).length +
        u2.questions.length -
        (Object.keys(u1.answers).length + u1.questions.length)
    );
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
