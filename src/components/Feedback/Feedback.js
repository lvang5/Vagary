import React, { Component } from 'react';
import {FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, Button, TextField} from '@material-ui/core';
import {connect} from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  start: state.tripReducer,
  end: state.tripReducer,
  currentCar: state.tripReducer
});

class Feedback extends Component {
  SubmitForm = () => {
    this.props.dispatch({ type: 'ADD_DATA', payload: this.state })
    axios({
      method: 'POST',
      url: '/api/cars/feedback',
      data: this.state
    }).then((response) => {
      console.log('success with POST');
    }).catch((error) => {
      console.log(error);
      alert('unable to add car');
    })
    this.props.history.push('history');
  }

  constructor() {
    super()
    this.state = {rating:'',
                  review: '',
                 start_time: '',
                  end_time: '',
                  car_id: '',

    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.setState({
      start_time: this.props.start.start_time,
      end_time: this.props.end.end_time,
      car_id: this.props.currentCar.car
    })
  }


  ComponentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  handleChange = event => {
    this.setState({ rating: event.target.value });
  };

  handleReview = event => {
    this.setState({ review: event.target.value,
                   });
  };

  handleRoute = () => {
    this.props.history.push('history');
  }
  render() {

    console.log(this.state)

    return (
      
      
      <div>
        
        
        <FormControl component="fieldset" >
        <FormLabel component="h1">Would you like to leave some feedback?</FormLabel>
          <RadioGroup   aria-label="feedback"
            name="feedback"
            
            value={this.state.rating}
            onChange={this.handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1 - Needs Reinforcement" />
            <FormControlLabel value="2" control={<Radio />} label="2 - Below expectation" />
            <FormControlLabel value="3" control={<Radio />} label="3 - Meets Expectations" />
            <FormControlLabel value="4" control={<Radio />} label="4 - Above meets expectation" />
            <FormControlLabel value="5" control={<Radio />} label="5 - Exceeds Expectations" />
            <FormControlLabel control={<TextField onBlur={this.handleReview} id="outlined-full-width"
          label="Comments"
          style={{ margin: 8 }}
          placeholder="This Applicaiton is awesome"
          width='100%'
          margin="normal"
          variant="outlined"
          rowsMax="100"
          InputLabelProps={{
            shrink: true,
          }}
        />}/>
          </RadioGroup>
          
       
        <br/>
        <Button variant="contained"  aria-label="Delete" onClick={this.SubmitForm}> Submit</Button>
        
        <br/>
        <Button variant="contained" color="secondary" aria-label="Delete" onClick={this.handleRoute}> No, I would not like to leave any feedback </Button>
        </FormControl>

        
      </div>

    )
  }
}


export default connect(mapStateToProps)(Feedback);