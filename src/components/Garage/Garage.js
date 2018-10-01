import React, { Component } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Dialog,  DialogActions, DialogContent, DialogTitle, DialogContentText, Slide, TextField, InputBase, ListSubheader } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import LoggedInNav from '../Nav/LoginNav.js';


const mapStateToProps = state => ({
    user: state.user,
  });

  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
class Garage extends Component {
    state = {
        garage: [],
        open: false,
    currentVehicle:{},
      make: '',
      model: '',
      color: '',
      year: '',
      city: '',
      state: '',
      image_path: '',
      latitude: '',
      longitude: '',
      };

  componentDidMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getMyCars();
    this.config = {
      cloud_name: process.env.REACT_APP_CLOUD,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_KEY_SECRET,
      upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  }
  }

  ComponentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }


  getMyCars = () => {
    axios.get(`/api/cars/owner`)
    .then(response => {
      console.log(response.data);
        this.setState({garage: response.data
        })
    }).catch(error => {
      console.log(error);
      this.props.history.push('home');
    });
  }

  handleOpen = (vehicle) => {
    this.setState({ open: !this.state.open,
    currentVehicle: vehicle });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => () => {
    console.log('DELETE ME');
    axios.delete('/api/cars/'+ id)
    .then(response => {
      this.getMyCars();
      console.log('Oh no this item has been deleted', response);
    }).catch(error => {
      console.log('You got an error');
      alert('There is an error somewhere, check here:', error);
    })
  };

  handleChange = (event) => {
    this.setState({
     
        ...this.state,
        [event.target.name]: event.target.value,
      
    });
  }


    handleUpdate = id => () => {
      console.log(id)
      axios.put('/api/cars/garage/'+ id,  this.state)
      .then(response => {
        this.getMyCars();
        console.log('Car Updated', response);
      }).catch(error => {
        console.log('You got an error');
        alert('There is an error somewhere, check here:', error);
      })
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
          alert('Uploaded Image')
        }
      })
    }


  render() {

    console.log(this.state.garage);
    
    return (
      <div>
       <LoggedInNav />
             <Grid container justify="space-around" alignItems="flex-end" style={{margin: '   '}}>
            {this.state.garage.map((vehicle, i)=> {
              return(
              <Grid key={i} >
              
              <Card >
                <CardMedia image={vehicle.image_path}
                style={{height: '200px',
                        width: '400px',
                       
                        }}/>
                <CardContent>
                  <Typography variant="body1">
                        {vehicle.make} {vehicle.model}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() =>this.handleOpen(vehicle)}>Edit</Button>
                  <Button onClick={this.handleDelete(vehicle.car_id)}>Delete</Button>
                 <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div>
            <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
          {this.state.currentVehicle.make} {this.state.currentVehicle.model}
          </DialogTitle>
          <DialogContent>
        
           <TextField onChange={this.handleChange} type="text" name="make" placeholder={this.state.currentVehicle.make} value={this.state.make}/>
           <br/>
           <TextField  onChange={this.handleChange} type="text" name="model" placeholder={this.state.currentVehicle.model} value={this.state.model}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="color" placeholder={this.state.currentVehicle.color}  value={this.state.color}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="year" placeholder={this.state.currentVehicle.year} value={this.state.year}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="city" placeholder={this.state.currentVehicle.city}  value={this.state.city}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="state" placeholder={this.state.currentVehicle.state}  value={this.state.state}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="latitude" placeholder={this.state.currentVehicle.latitude}  value={this.state.latitude}/>
           <br/>
           <TextField onChange={this.handleChange} type="text" name="longitude" placeholder={this.state.currentVehicle.longitude} value={this.state.longitude}/>
           <br/>
              <Button onClick={this.openCloudinary} color="primary">
              Upload Image
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleUpdate(vehicle.car_id)} color="primary">Update</Button> 
          </DialogActions>
        </Dialog> 
          </div>
        </Modal>
                </CardActions>
              </Card>
            </Grid>


);
         
              
})}
 </Grid>
      </div>
    )
  }
}


export default connect(mapStateToProps)(Garage);