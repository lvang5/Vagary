import React, { Component } from 'react';
import {Grid, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';


class ViewCars extends Component {





  handleClick = () => {
    // this.props.history.push('carinfo');
  }
  render() {
    console.log(this.props.car);
    
    return (
      <div>
        
      
            <Grid onClick={this.handleClick} container justify="space-around" alignItems="center" style={{marginTop: '20px'}}>
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
                  <Button>View Car</Button>
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
const mapReduxStateToProps = (reduxState) => ({
  car: reduxState.carReducer,

});

export default connect(mapReduxStateToProps)(ViewCars);
