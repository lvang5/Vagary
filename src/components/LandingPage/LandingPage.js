import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Avatar, Grid, TextField, Button, ListSubheader} from '@material-ui/core';
import GoogleMap from '../GoogleMap/GoogleMap.js';



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
      
  
        <div className="container-div">
        <Grid container alignContent="flex-end">
        <GoogleMap/>
          {/* <img className="img" src="https://www.samsung.com/global/galaxy/galaxy-note8/images/galaxy-note8_overview_kv_type1.jpg"/> */}
        <div>
        {/* <React-Component style={{  margin: '0',
 
    position: 'absolute',
    top: '40%',
    left: '40%',
    marginRight: '-50%',
    transform: ('-50%', '-50%')}}>

        <TextField
          label="e.g. City"
          margin="normal"
          variant="outlined"
          onBlur={this.handleInput}
        />
       
        <Button  variant="outlined" onClick={this.handleClick}>Submit</Button>

        </React-Component> */}
        <Grid item sm={6} style={{fontSize:'15px', color: 'white'}}>
        <Avatar alt="Lais Vang" src="https://avatars1.githubusercontent.com/u/38891207?s=460&v=4" style={{width: 100,
        height: 100,}} />
        <h3 className="founder-header">Founder</h3>
        
        Hello, I'm Lais a second generation Hmong American pursing my passion in technology by making a difference in the vast world of technology.
         I plan to make a difference by developing one application at a time. I've decided to create my very first full-stack application called Vagary, where a roaming journey starts.
         Enjoy your visit here and please let me know what you think by leaving me some feedback.  
      
        
   
           
          
        </Grid>
  
   
       
</div>
</Grid>

        </div>
      
    );

  }
}


export default connect()(LandingPage);

