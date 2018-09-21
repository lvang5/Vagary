import React, { Component } from 'react';
import {Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Modal } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';


class ViewCars extends Component {
  constructor(){
    super()
      this.state = {open: false}
    
  }



  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleClick = () => {

    // this.props.history.push('start');
  }
  render() {
    console.log(this.props.car);
    
    return (
      <div>


                 <Grid onClick={this.handleClick} container justify="space-around" alignItems="flex-end" style={{marginTop: '20px'}}>
            {this.props.car.map((vehicle, i)=> {
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
                  <Button >View Car</Button>
                </CardActions>
              </Card>
            </Grid>
                

            );
         
              
            })}
            
      </Grid>
              <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div >
     
          </div>
        </Modal>
      {/* space around cards */}
           
      </div>
    )
  }
}
const mapReduxStateToProps = (reduxState) => ({
  car: reduxState.carReducer,

});

export default connect(mapReduxStateToProps)(ViewCars);
