import React, { Component } from 'react';


class LandingPage extends Component {
  constructor() {
    super()
    this.state = { location: '' }
  }

  handleClick = () => {
    // this.props.history.push('view');
    //here is where we do our axios request
  }

  handleInput = (event) => {
    //this takes in the value input
    this.setState({
      location: event.target.value
     })
     
  }

  render() {
    return (
      
      <div>
        Welcome to the landing page
         <input placeholder="e.g. City, State, Zipcode" onBlur={this.handleChange}/>
        <button onClick={this.handleClick}>Submit</button>
        {/* Find image for backgroud */}
        <div>
          <div className="container-div">
          <h3>Mission Statement</h3>
          Vagary is an application that offers affordable rental pricing for vehicles to 
          tourist/locals wherever they plan to visit. Anyone can access the site and view 
          the different vehicles that are available to rent. In order for a user to be a 
          renter or complete a rent, that user will have to create an account with the application 
          to be able to checkout/add their vehicle.  
          
           {/* Mission Statement */}
          </div>
          <div>
            some text for how
  
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

