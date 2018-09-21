import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Avatar, Grid, TextField, Button} from '@material-ui/core';



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
          
        <div>
      
 

        <React-Component style={{  margin: '0',
 
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
         {/* <Input placeholder="e.g. City" /> */}
        <Button  variant="outlined" onClick={this.handleClick}>Submit</Button>
        {/* Find image for backgroud */}
        </React-Component>
    
      
        
         <Grid container alignContent="flex-end">

      
         
        <Grid item sm={5} style={{marginTop:'24%', fontSize:'15px'}}>
        <Avatar alt="Lais Vang" src="https://avatars1.githubusercontent.com/u/38891207?s=460&v=4" style={{width: 100,
      height: 100,}} />
      <h3>Founder</h3>
        Hello, I'm Lais a second generation Hmong American pursing my dream of making a difference in the vast world of technology.
         As a step towards my dream to make a difference one application at a time I've decided to create my very first full-stack application, Vagary, where a roaming journey starts.
         Enjoy your visit here and please let me know what you think by leaving some feedback.  

        
   
           
          
        </Grid>
  
   
        </Grid>

</div>

        </div>
      
    );

  }
}


export default connect()(LandingPage);

