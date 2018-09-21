import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';



class LandingPage extends Component {
  constructor() {
    super()
    this.state = { location: ''}
  }



  handleInput = (event) => {
    //this takes in the value input
    this.setState({
      location: event.target.value
     })
     
  }

  handleClick = () => {
   
      axios.get(`/api/cars/?city=` + this.state.location)
      .then(response => {
        console.log(response.data);
        this.props.dispatch({type: 'SET_CAR', payload: response.data})
      }).catch(error => {
        console.log(error);
        this.props.history.push('home');
      });
    

  
      this.props.history.push('view');
    //here is where we put dispatch to reducer
   
  }
 


  render() {
    
    
    return (
      
      <div>
        Welcome to the landing page
         <input placeholder="e.g. City" onBlur={this.handleInput}/>
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
      <Avatar alt="Lais Vang" src="https://avatars1.githubusercontent.com/u/38891207?s=460&v=4"  />
    
    </div>
          <div>
            some text
          </div>
        </div>
      </div>
    );

  }
}


export default connect()(LandingPage);

