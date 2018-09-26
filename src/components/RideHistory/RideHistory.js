import React, { Component } from 'react';
import { Button, Paper, Grid, Typography, List, ListItem, ListItemText, CardMedia, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import moment from 'moment';


class RideHistory extends Component {
  state = {currentCar: [],
            start_date: null,
            end_date: null}
        



  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.setCurrentCar();
    this.setState({
      start_date: moment(this.props.trip.start_time).format('LLLL'),
      end_date: moment(this.props.trip.end_time).format('LLLL')
    })
    
  }


  setCurrentCar() {

    for(let car of this.props.car){
      console.log(car)

      if(car.car_id === this.props.trip.car_id){
        console.log("car found")
        this.setState({
          currentCar: car,
        })
      }
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  handleDone = () => {
    this.props.history.push('home');
  }

  
  render() {
    return (
      <div>
        <Paper>
          <h1 align="center">Ride History</h1>
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
                      <CardMedia image={this.state.currentCar.image_path}
                        style={{
                          height: '300px',
                          width: '400px',
                          marginLeft: '75%',
                          border: 'solid'
                        }} />
                        <CardContent style={{
                          height: '250px',
                          width: '400px',
                          marginLeft: '75%'
                        }}>
                      <Typography variant="title">
                        Car: {this.state.currentCar.make} {this.state.currentCar.model}
                      </Typography>
                      <Typography variant="title">
                        Duration of Ride: {this.props.trip.duration}
                      </Typography>
                      <Typography variant="title">
                        Rented: { this.state.start_date}
                      </Typography>
                      <Typography variant="title">
                        Returned: { this.state.end_date}
                      </Typography>
                      <Typography variant="title" >
                        Thank you for your feedback!
                        <br/>
                       Rating: {this.props.trip.rating} 
                       <br/>
                       Review: {this.props.trip.review}
                      </Typography>
                      <Button disableFocusRipple="true" disableRipple="true" variant="extendedFab" onClick={this.handleDone} style={{ float: 'right', margin: '0' }}>Finish</Button>
                      </CardContent>
            </Grid>
          </Grid>
         
        </Paper>
      </div>
    )
  }
}

const mapReduxStateToProps = (reduxState) => ({
  user: reduxState.user,
  trip: reduxState.tripReducer,
  car: reduxState.carReducer
});
export default connect(mapReduxStateToProps)(RideHistory);