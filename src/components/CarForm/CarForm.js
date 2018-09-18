import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
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
        image: '',
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
      // this.props.history.push('home');
    }

    return (
      <div>
        <h1> Car Form </h1>
        <form onSubmit={this.sendForm}>
          {/* get input values */}
          <input onChange={this.handleChange} type="text" name="make" placeholder="Make" /> <br />
          <input onChange={this.handleChange} type="text" name="model" placeholder="Model" /> <br />
          <input onChange={this.handleChange} type="text" name="color" placeholder="Color" /> <br />
          <input onChange={this.handleChange} type="number" name="year" placeholder="Year" /> <br />
          <input onChange={this.handleChange} type="text" name="city" placeholder="City" /> <br />
          <input onChange={this.handleChange} type="text" name="state" placeholder="State" /> <br />
          <input onChange={this.handleChange} type="text" name="image" placeholder="image path" /> <br />
          <input onChange={this.handleChange} type="text" name="latitude" placeholder="Latitude" /> <br />
          <input onChange={this.handleChange} type="text" name="longitude" placeholder="Longitude" /> <br />
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
