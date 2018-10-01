import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Paper, Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Dialog,  DialogActions, DialogContent, DialogTitle, DialogContentText, Slide } from '@material-ui/core';


function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  
export class MapContainer extends Component {
    state = {car : [],
        open: false,
    currentVehicle:{},
    showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }
  

    componentDidMount(){
    this.getAllCars();
    
    }




  
    getAllCars(){  
    axios.get(`/api/cars/all` )
    .then(response => {
      console.log(response.data);
      this.setState({
          car: response.data
      })
    }).catch(error => {
      console.log(error);
    });
}

onMarkerClick = (vehicle) => {
    this.setState({ open: !this.state.open,
        currentVehicle: vehicle
        });
}

  handleClose = () => {
    this.setState({ open: false });
  };

  onCurrentLocation = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
}



  render() {
      
    console.log(this.props.zoom);
    let mapMarker = this.state.car.map((vehicle, i) => {
        return (
            <Marker key={i}
            onClick={() =>this.onMarkerClick(vehicle)}
            name={vehicle.make}
            name={vehicle.model}
            position={{lat: vehicle.latitude, lng: vehicle.longitude}}
            />
            
        )
    })

    const style = {
        height: '400px',
        width: '100vw',
        position: 'relative',
        margin:'0 auto'
      }
    return (
            
        
        <div style={style}>
       
       
      <Map center={this.props.initialCenter} google={this.props.google} zoom={this.props.zoom} initialCenter={this.props.initialCenter} >
            {/* <Marker 
            
            position={{lat: this.state.car[0].latitude, lng: this.state.car[0].longitude}}/> */}
        <Marker onClick={this.onCurrentLocation}
         position={{lat:44.978031 , lng: -93.26350100000002}}
                name={'Prime Digital Academy'} />
            {mapMarker}
  
            <InfoWindow 
            onClose={this.onInfoWindowClose}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
           
              <div>
                <h1>{this.state.selectedPlace.name} </h1>
    
              </div>
        </InfoWindow>
      
    
      </Map>
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
            Enjoy your time in {this.state.currentVehicle.city} {this.state.currentVehicle.state}. Select more details to rent me or find other cars available in this city.
            </DialogContentText>
            

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={() =>this.props.OnHandleClick(this.state.car)} color="primary">
            More Details
            </Button>
          </DialogActions>
        </Dialog> 
          </div>
        </Modal>


      </div>
    );
  }
}
 
const connectToGoogleMaps = GoogleApiWrapper({
    apiKey: ('AIzaSyAfrUvtgh7j4JKGW6bkFPspZ4ZZ8uqlE-M')
})(MapContainer)

const mapStateToProps = (state) => ({
    car: state.carReducer,
  
  });

export default connect(mapStateToProps)(connectToGoogleMaps)