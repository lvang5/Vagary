import React, { Component } from 'react';
import {FormControlLabel, FormControl, RadioGroup, Radio, FormLabel, Button, TextField} from '@material-ui/core';
import {connect} from 'react-redux';




class Feedback extends Component {
  SubmitForm = () => {
    this.props.dispatch({ type: 'ADD_DATA', payload: this.state })
    
  }

  constructor() {
    super()
    this.state = {rating:'',
                  review: '',
                  start_time: '',
                  end_time: '',
                  // end_time: this.props.start[0].end_time,

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
    this.props.history.push('home');
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
        <Button variant="extendedFab" aria-label="Delete" onClick={this.handleRoute}> Exit  </Button>
        
    <Button variant="extendedFab" aria-label="Delete" onClick={this.SubmitForm}> Submit</Button>
        </FormControl>

    

      </div>

    )
  }
}
const mapReduxStateToProps = (reduxState) => ({
  start: reduxState.tripReducer
});

export default connect(mapReduxStateToProps)(Feedback);