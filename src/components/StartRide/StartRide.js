import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

import LoggedInNav from '../Nav/LoginNav.js';
//moment().format(); takes in current time 
//setInterval pass in a function, 1000 millesec
//goes into the saga
//post in  database of start time
//start time in the redux state
//.diff
// call the state. 
// create a state fo end time
//re declare on

let clockInterval;
let timer;


const mapStateToProps = state => ({
  user: state.user,
  car: state.tripReducer.currentVehicle.car_id
});



class StartRide extends Component {
  constructor() {
    super();
    this.state = {
      showTime: true,
      timeElapsed: '00:00:00',
      start_time: null,
      end_time: null,
      car: null,
    }

  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    clockInterval = setInterval(this.update, 1000)
    this.setState({
      car: this.props.car
    })
  }


  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }
  handleEnd = id => () => {
    this.setState({
      // showTime: false,
      end_time: moment().format()
    })
    clearInterval(clockInterval);

    axios.put('/api/cars/status/'+ id, {available: true})
    .then(response => {
      console.log('Car Updated', response);
    }).catch(error => {
      console.log('You got an error');
      alert('There is an error somewhere, check here:', error);
    })
    
  }

  handleStart = id => () => {
    this.setState({
      showTime: false,
      start_time: moment().format()
    })

    axios.put('/api/cars/status/'+ id, {available: false})
    .then(response => {
      console.log('Car Updated', response);
    }).catch(error => {
      console.log('You got an error');
      alert('There is an error somewhere, check here:', error);
    })
  }

  handleComplete = () => {
    this.props.dispatch({ type: 'ADD_DATA', payload: this.state })
    this.props.history.push('feedback');
  }

  update = () => {
    let duration = moment().diff(this.state.start_time)
    if(isNaN(duration)){
      return;
    }
    let formattedDuration = this.formatTime(duration)
    this.setState({
      timeElapsed: formattedDuration
    })
  }

  formatTime = (duration) => {
    let s = Math.floor((duration / 1000) % 60);
    let m = Math.floor((duration / 1000 / 60) % 60);
    let h = Math.floor(duration / (1000 * 60 * 60));
    s = s.toString();
    m = m.toString();
    h = h.toString();
    if (s.length === 1) {
      s = '0' + s;
    }
    if (m.length === 1) {
      m = '0' + m;
    }
    if (h.length === 1) {
      h = '0' + h;
    }
    return `${h}:${m}:${s}`;
  }


  render() {

    let startButton = null;
    if (this.state.showTime) {
      startButton = <button onClick={this.handleStart(this.props.car)} className="start">Start Your Ride</button>;
      timer = '00:00:00';
    } else {
      startButton = <button onClick={this.handleEnd(this.props.car)} className="stop" >End Ride</button>

      timer = this.state.timeElapsed;
    }



    return (
      <div>

      <LoggedInNav />


        <br />


         {/* <div className="container-button"> */}
          <div className="time-display">
            {timer}
          </div>
          {startButton}
          <button onClick={this.handleComplete}  className="complete-btn">Complete ride</button>
        {/* </div> */}
        
        <br />
     
      </div>
    )
  }

}


export default connect(mapStateToProps)(StartRide);



