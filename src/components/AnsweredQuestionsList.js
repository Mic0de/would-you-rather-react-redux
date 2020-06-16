import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AnsweredQuestionsList extends Component {
    render() {
        console.log("** AnsweredQuestionsList props: ", this.props)
        return (
            <div>
                Answered Questions List!
                <p>{this.props.authedUser}</p>
                <ul>
                    <li>{JSON.stringify(this.props.questions)}</li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps({state}){
    const {questions, authedUser} = state;
    return {
    authedUser,
    questions //: questions.filter(([k, q])=> (q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)))
}
    
    }

function mapDispatchToProps() {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AnsweredQuestionsList)
