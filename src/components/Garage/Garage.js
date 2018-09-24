import React, { Component } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Dialog,  DialogActions, DialogContent, DialogTitle, DialogContentText, Slide } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
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
    currentVehicle:{}
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
    console.log(id);
    
    axios.delete('/api/cars/'+ id)
    .then(response => {
      this.getMyCars();
      console.log('Oh no this item has been deleted', response);
    }).catch(error => {
      console.log('You got an error');
      alert('There is an error somewhere, check here:', error);
    })
  };


  render() {

    console.log(this.state.garage);
    
    return (
      <div>

             <Grid container justify="space-around" alignItems="flex-end" style={{marginTop: '20px'}}>
            {this.state.garage.map((vehicle, i)=> {
              return(
              <Grid key={i} >
              
              <Card>
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
          <CardMedia image={this.state.currentVehicle.image_path}
                    style={{
                      height: '300px',
                      width: '600px'
                    }} />
            <DialogContentText id="alert-dialog-slide-description">
                    My collection of Audis plus my beater car.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleClick} color="primary">
              Done
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
      </div>
    )
  }
}


export default connect(mapStateToProps)(Garage);