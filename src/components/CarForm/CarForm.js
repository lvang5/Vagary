import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { TextField } from '@material-ui/core';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Grid, GridListTile, ListSubheader, Paper } from '@material-ui/core'

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
      <div className="carForm">


        <Grid container spacing={16} direction="column" align="center">
        
 
          <form onSubmit={this.sendForm}>
            {/* get input values */}
            <Grid item xs={6}>
            <Paper style={{width: '350px', marginLeft:'-45%'}}>
            <ListSubheader component="h1" style={{fontSize: '2em', color: 'black'}}>Car Registration</ListSubheader>
              <TextField
                label="Make"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="make" value={this.state.make} />
              <br />
              <TextField
                label="Model"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="model" value={this.state.model} />
              <br />
              <TextField
                label="Color"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="color" value={this.state.color} />
              <br />
              <TextField
                label="Year"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="year" value={this.state.year} />
              <br />
              <TextField
                label="City"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="city" value={this.state.city} />
              <br />
              <TextField
                label="State"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="state" value={this.state.state} />
              <br />
              <TextField
                label="Image URL"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="image_path" value={this.state.image_path} />
              <br />
              <TextField
                label="Latitude"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="latitude" value={this.state.latitude} />
              <br />
              <TextField
                label="Longitude"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange} type="text" name="longitude" value={this.state.longitude} />
              {/* move button to far right */}
              <br/>
              <input type="submit" />
              </Paper>
            </Grid>
          </form>

        </Grid>
        {/* { content } */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CarForm);
