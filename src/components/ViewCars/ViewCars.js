import React, { Component } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Dialog,  DialogActions, DialogContent, DialogTitle, DialogContentText, Slide } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}
//
class ViewCars extends Component {
  state = {
    open: false,
    currentVehicle:{}
  };


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }


  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }


  handleOpen = (vehicle) => {
    this.setState({ open: !this.state.open,
    currentVehicle: vehicle });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.props.history.push('start');
  };

  render() {

   console.log(this.state.open);
  //  handleClose={this.handleClose} handleClickOpen={this.handleClickOpen} 
    return (
    
      <div>
        <Grid container justify="space-around" alignItems="flex-end" style={{ marginTop: '20px' }}>
          {this.props.car.map((vehicle, i) => {
            return (
              <Grid key={i} >
                <Card>
                  <CardMedia image={vehicle.image_path}
                    style={{
                      height: '200px',
                      width: '400px'
                    }} />
                  <CardContent>
                    <Typography variant="body1">
                      {vehicle.make} {vehicle.model}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() =>this.handleOpen(vehicle)}>View Car</Button>
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
          <CardMedia image={this.state.currentVehicle.image_path}
                    style={{
                      height: '300px',
                      width: '600px'
                    }} />
            <DialogContentText id="alert-dialog-slide-description">
                    This car is currently located in {this.state.currentVehicle.city} {this.state.currentVehicle.state}. As you can see it has a beautiful {this.state.currentVehicle.color} coat. 
                    If you are interested in renting this vehicle go ahead and select rent and you'll be on your way to a roaming journey.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleClick} color="primary">
            Continue to rent
            </Button>
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
        {/* space around cards */}
      </div>
    )
  }
}
const mapReduxStateToProps = (reduxState) => ({
  car: reduxState.carReducer,
  user: reduxState.user,

});

export default connect(mapReduxStateToProps)(ViewCars);


