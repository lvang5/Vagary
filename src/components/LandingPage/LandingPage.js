import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Avatar, Grid, TextField, Button, ListSubheader, Typography} from '@material-ui/core';
import GoogleMap from '../GoogleMap/GoogleMap.js';
import LoggedInNav from '../Nav/LoginNav.js';
import LoggedOutNav from '../Nav/LogoutNav.js';


class LandingPage extends Component {
  constructor() {
    super()
    this.state = { 
      zoom: 4,
      location: '',
    initialCenter: {
      lat: 37.09024, 
      lng: -95.712891
        },
        currentVehicle:{}
      }

  }


  OnHandleClick = (vehicle) => {
    this.props.history.push('view');
    console.log('clicked');
  };


  handleInput = (event) => {
    //this takes in the value input
    this.setState({
      location: event.target.value
     })
     
  }

  handleClick = () => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
      address: this.state.location,
      key: 'AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M'
        }
    }).then((response)=>{
      this.props.dispatch({ type: 'FETCH_CITY', payload: this.state.location })
      console.log(response.data.results[0].geometry.location);
      this.setState({
        initialCenter: response.data.results[0].geometry.location,
        zoom: 11
      });
    }).catch((error)=>{
      console.log(error)
    })
      // axios.get(`/api/cars/?city=` + this.state.location)
      // .then(response => {
      //   console.log(response.data);
      //   this.props.dispatch({type: 'SET_CAR', payload: response.data})
      // }).catch(error => {
      //   console.log(error);
      //   this.props.history.push('home');
      // });
      // this.props.history.push('view');
    //here is where we put dispatch to reducer
   
  }

  handleView = () => {
    this.props.history.push('view');
  }

  render() {
   
    
    return (
        <div className="container-div">

           {this.props.user.userName ? (
      <LoggedInNav />
    ) : (
      <LoggedOutNav />
      
    )}
        <Grid container alignContent="flex-end">
        <GoogleMap initialCenter={this.state.initialCenter} zoom={this.state.zoom}  OnHandleClick={this.OnHandleClick} />
          
        <div>
        <React-Component style={{  margin: '0',
 
    position: 'absolute',
    left: '40%',
    marginRight: '-50%',
    transform: ('-50%', '-50%')}}>

        <TextField
          label="e.g. City"
          margin="normal"
          variant="filled"
          onBlur={this.handleInput}
          fullWidth
          style={{backgroundColor:"white"}}
        /><span>
       
        <Button  variant="outlined" onClick={this.handleClick} 
        style={{backgroundColor:"white",
                marginLeft: '110%',
                marginTop: '-35%',
              }}>
        Submit</Button></span>
      

        </React-Component>
        <Grid item sm={6} style={{fontSize:'15px', color: 'white', position: 'fixed',
bottom: '0',
left: '0' }}>
        <Avatar alt="Lais Vang" src="https://avatars1.githubusercontent.com/u/38891207?s=460&v=4" style={{width: 80,
        height: 80,}} />
        <h3 className="founder-header">Founder</h3>
        <Typography style={{fontSize:'15px', color: 'white',  }}>
        Hello, I'm Lais a second generation Hmong American pursing my passion in technology by making a difference in the vast world of technology.
         I plan to make a difference by developing one application at a time. I've decided to create my very first full-stack application called Vagary, where a roaming journey starts.
         Enjoy your visit here and please let me know what you think by leaving me some feedback.  
         </Typography>
        </Grid>
  
   
       
</div>
</Grid>

        </div>
      
    );

  }
}

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(LandingPage);

