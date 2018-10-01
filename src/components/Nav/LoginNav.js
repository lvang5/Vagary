import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Avatar, Grid, TextField, Button, ListSubheader} from '@material-ui/core';
import axios from 'axios';



const mapStateToProps = state => ({
  user: state.user,
});
class LoginNav extends Component{ 
state= {image: '',
        person: [],}
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getImage();
  }


  getImage() {
    axios.get(`/api/cars/user`)
    .then(response => {
      console.log(response.data);
        
  for(let pic of response.data){
    if (this.props.user.userName === pic.username) {
      this.setState({
        image: pic.profile_pic
      })
    }
  }
     
    }).catch(error => {
      console.log(error);
    });
  }



  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
      this.props.dispatch(triggerLogout());
  }



  render(){
    return(
<div className="navbar">
    <div>
    <ListSubheader  style={{ color: 'white', marginLeft:'-2%', }}>Welcome {this.props.user.userName}<Avatar alt={this.props.user.userName} src={this.state.image} style={{ position: 'absolute', top: '0', 
             marginLeft:'80%', }}/> </ListSubheader>
    {/* <h3 className="welcome">
    </h3> */}
      <ul className="center_nav">
      <br />
        <li>
        <Link to="/home">
              VAGARY
            </Link>
          </li>
          <li>
          <Link to="/rent">
            LIST CAR
          </Link>
          </li>
          <li>
          <Link to="/garage">
            GARAGE
          </Link>
          </li> 
          <li>
          
          </li>
        <li>
        
    
         <Button
            onClick={this.logout}
            style={{
             position: 'absolute',
             top:'0', 
             right:'0',
             fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
          }}
          >
            <Link to="/home">
            Log Out
            {/* Change button and text */}
          </Link>
            
          </Button>
        </li>
      </ul>
    </div>
  
    {/* <ListSubheader style={{
      color: 'black',
      position: 'fixed',
      marginLeft:'23%',
   
    }}> */}
  </div>
    );
  }
  
}

export default connect(mapStateToProps)(LoginNav);



          