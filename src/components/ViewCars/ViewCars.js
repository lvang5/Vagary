import React, { Component } from 'react';
import {Grid, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';


class ViewCars extends Component {

  getCars = () => {
    axios.get('/api/cars')
    .then(response => {
      const action = {
        type: 'SET_CAR',
        payload: response.data
      };
      this.props.dispatch(action);
    }).catch(error => {
      console.log(error);
      // this.props.history.push('home');
    });
  };

  componentDidMount() {
    this.getCars();
  }



  handleClick = () => {
    // this.props.history.push('carinfo');
  }
  render() {
    console.log(this.props.car.map);
    
    return (
      <div>
        
        
            {/* <Grid onClick={this.handleClick} container justify="space-around" alignItems="center" style={{marginTop: '20px'}}>
            {this.props.car.map((vehicle)=> {
              return(
              <Grid key={vehicle.id} >
              <Card>
                <CardMedia image={vehicle.image_path}
                style={{height: '200px',
                        width: '350px' 
                        }}/>
                <CardContent>
                  <Typography variant="body1">
                        {vehicle.make} {vehicle.model}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>View Car</Button>
                </CardActions>
              </Card>
            </Grid>
            );
         
              
            })}
            
      </Grid> */}
      </div>
    )
  }
}
const mapReduxStateToProps = (reduxState) => ({
  car: reduxState.carReducer
});

export default connect(mapReduxStateToProps)(ViewCars);
