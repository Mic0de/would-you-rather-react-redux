import React, { Component } from 'react'
import { connect } from 'react-redux'

export class UnansweredQuestionsList extends Component {
    render() {
        return (
            <div>
                Unanswered Questions List!!
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestionsList)
