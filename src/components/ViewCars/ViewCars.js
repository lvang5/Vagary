import React, { Component } from 'react';
import {Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';


class ViewCars extends Component {

  handleClick = () => {
    this.props.history.push('carinfo');
  }
  render() {
    return (
      <div>
            <Grid onClick={this.handleClick} container justify="space-around" alignItems="center" style={{marginTop: '20px'}}>
     
            <Grid >
              <Card>
                <CardMedia style={{height: '150px'}}/>
                <CardContent>
                  <Typography variant="body1">
                 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>View Car</Button>
                </CardActions>
              </Card>
            </Grid>
         
      </Grid>
      </div>
    )
  }
}

export default ViewCars;
