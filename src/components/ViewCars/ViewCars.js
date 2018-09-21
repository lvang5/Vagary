import React, { Component } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography, Dialog, fullScreen, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';


class ViewCars extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {

    this.props.history.push('start');
  }
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Grid container justify="space-around" alignItems="flex-end" style={{ marginTop: '20px' }}>
          {this.props.car.map((vehicle, i) => {
            return (
              <Grid key={i} >
                <Dialog
                  fullScreen={fullScreen}
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{vehicle.make} {vehicle.model}</DialogTitle>
                  <DialogContent>
                    <DialogContentText image={vehicle.image_path}
                    style={{
                      height: '200px',
                      width: '400px'
                    }} >
                      {vehicle.color}
            </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Close
            </Button>
                    <Button onClick={this.handleClick} color="primary" autoFocus>
                      Rent!
            </Button>
                  </DialogActions>
                </Dialog>
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
                    <Button onClick={this.handleClickOpen}>View Car</Button>
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

});

export default connect(mapReduxStateToProps)(ViewCars);


