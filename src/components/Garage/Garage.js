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
    editCar: {
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
      };

  componentDidMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getMyCars();
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
      editCar: {
        ...this.state.editCar,
        [event.target.name]: event.target.value,
      }
    });
  }


    handleUpdate = id => () => {
      console.log(id)
      axios.put('/api/cars/garage/'+ id, {editCar: this.state.editCar})
      .then(response => {
        this.getMyCars();
        console.log('Car Updated', response);
      }).catch(error => {
        console.log('You got an error');
        alert('There is an error somewhere, check here:', error);
      })
    }
  


  render() {

    console.log(this.state.garage);
    
    return (
      <div>
       <LoggedInNav />
             <Grid container justify="space-around" alignItems="flex-end" style={{marginTop: '20px'}}>
            {this.state.garage.map((vehicle, i)=> {
              return(
              <Grid key={i} >
              
              <Card style={{marginTop: '20px'}}>
                <CardMedia image={vehicle.image_path}
                style={{height: '200px',
                        width: '400px' 
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