import React, { Component } from 'react'

export default class Feedback extends Component {
  SubmitForm = () => {
    this.props.history.push('home');
  }
  render() {

   

    return (
      <div>


        Leave us with some feedback
        <form onSubmit={this.SubmitForm}>
          <input type="radio" value="male" checked /> 1
          <input type="radio" value="female" /> 2
          <input type="radio" value="other" /> 3 
          <input type="radio" value="other" /> 4 
          <input type="radio" value="other" /> 5<br />
        
        <input />
        <input type="submit"/>
        
        </form>
      </div>

    )
  }
}
