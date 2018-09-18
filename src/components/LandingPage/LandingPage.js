import React, { Component } from 'react';


class LandingPage extends Component {
  constructor() {
    super()
    this.state = { location: [] }
  }

  handleClick = () => {
    this.props.history.push('view');
    console.log('clicked');

  }





  render() {
    return (
      <div>
        Welcome to the landing page
         <input placeholder="e.g. City, State, Zipcode" />
        <button onClick={this.handleClick}>Submit</button>
        {/* Find image for backgroud */}
        <div>
          <div className="container-div">
            some text
           {/* Mission Statement */}
          </div>
          <div>
            some text
  
          </div>
          <div>
            some text
          </div>
        </div>
      </div>
    );

  }
}


export default (LandingPage);

