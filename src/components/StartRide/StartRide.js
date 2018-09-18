import React, { Component } from 'react'

class StartRide extends Component {


  handleClick = () => {
    this.props.history.push('history');
  }

  render() {
    return (
      <div>
        Start your ride now!

        <button>Start Ride</button>
        <button onClick={this.handleClick} >End Ride</button>
      </div>
    )
  }
}


export default StartRide;