import React, { Component } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
const mapStateToProps = state => ({
    user: state.user,
  });


class Garage extends Component {
    state = {
        garage: [],
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


  render() {

    console.log(this.state.garage);
    
    return (
      <div>

             <Grid onClick={this.handleClick} container justify="space-around" alignItems="flex-end" style={{marginTop: '20px'}}>
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
                  <Button >View Car</Button>
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