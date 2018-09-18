import React, { Component } from 'react'

class RideHistory extends Component {


  handleClick = () => {
      this.props.history.push('feedback');
  }

  handleDone = () => {
    this.props.history.push('home');
}

  render() {
    return (
      <div>

        Here is the ride history
          <button onClick={this.handleClick} >Leave Feedback</button>
        <button onClick={this.handleDone}>Done</button>
      </div>
    )
  }
}


export default RideHistory;