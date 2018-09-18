import React, { Component } from 'react'

class CarInfo extends Component {

  handleClick = () => {
    this.props.history.push('start');
  }
  render() {
    return (
      <div>
        Car info page
        <button onClick={this.handleClick}>Continue to Checkout</button>
      </div>
    )
  }
}
export default CarInfo;