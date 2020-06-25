import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnsweredQuestion extends Component {
    render() {
        return (
            <div>
                Answered Question Component!
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AnsweredQuestion)
