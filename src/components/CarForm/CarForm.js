import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { TextField } from '@material-ui/core';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Grid, GridListTile, ListSubheader, Paper, Button } from '@material-ui/core';
import LoggedInNav from '../Nav/LoginNav.js';

const mapStateToProps = state => ({
  user: state.user,
});

//USED FOR FILESTACK -- 




class CarForm extends Component {

  constructor() {
    super()
    this.state = {
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



  handleChange = (event) => {
    this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
    });


  }

componentDidMount() {
  this.config = {
      cloud_name: process.env.REACT_APP_CLOUD,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_KEY_SECRET,
      upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  }
}


openCloudinary = () => {
  window.cloudinary.openUploadWidget(this.config, (error, result) => {
    if (result) {
      // let cloudinaryUrl = result
      this.setState({
        // store url to local state BEFORE dispatching an action
        ...this.state,
        image_path: result[0].url        
      })
      console.log(this.state.image_path)
    }
  })
}

  render() {



    this.sendForm = (event) => {
      event.preventDefault();
      this.props.dispatch({ type: 'POST_DATA', payload: this.state })
      this.props.history.push('home');
    }


 



    return (
      <div className="carForm">
      <LoggedInNav />

        <Grid container spacing={16} direction="column" align="center">
        
 
          <form onSubmit={this.sendForm}>
            {/* get input values */}
            <Grid item xs={6}>
            <Paper style={{width: '350px', marginLeft:'-20%'}}>
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
              <Button onClick={this.openCloudinary} color="primary">
              Upload Image
            </Button>
            <br />
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
