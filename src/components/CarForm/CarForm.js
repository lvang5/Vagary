import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { TextField } from '@material-ui/core';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class CarForm extends Component {

  constructor() {
    super()
    this.state = {
      newCar: {
        make: '',
        model: '',
        color: '',
        year: '',
        city: '',
        state: '',
        image_path: '',
        latitude: '',
        longitude: '',


      }
    }
  }


  handleChange = (event) => {
    this.setState({
      newCar: {
        ...this.state.newCar,
        [event.target.name]: event.target.value,
      }
    });


  }



  render() {



    this.sendForm = (event) => {
      event.preventDefault();
      this.props.dispatch({ type: 'ADD_CAR', payload: this.state.newCar })
      axios({
        method: 'POST',
        url: '/api/cars',
        data: { newCar: this.state.newCar }
      }).then((response) => {
        console.log('success with POST');
      }).catch((error) => {
        console.log(error);
        alert('unable to add car');
      })
      this.props.history.push('home');
    }

    return (
      <div>
        <h1> Car Form </h1>
        <form onSubmit={this.sendForm}>
          {/* get input values */}
          <TextField onChange={this.handleChange} type="text" name="make" placeholder="make" value={this.state.make}/>
           <br/>
           <TextField  onChange={this.handleChange} type="text" name="model" placeholder="model" value={this.state.model}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="color" placeholder="color"  value={this.state.color}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="year" placeholder="year"  value={this.state.year}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="city" placeholder="city"  value={this.state.city}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="state" placeholder="state"  value={this.state.state}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="image_path" placeholder="Image URL"  value={this.state.image_path}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="latitude" placeholder="latitude"  value={this.state.latitude}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="longitude" placeholder="longitude" value={this.state.longitude}/>
          {/* move button to far right */}
          <input type="submit" />
        </form>

        {/* { content } */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CarForm);
