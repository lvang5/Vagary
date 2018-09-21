import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import Clock from 'react-live-clock';
import moment from 'moment';
import { USER_ACTIONS } from '../../redux/actions/userActions';
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
var m = moment();
m.set({hour:0,minute:0,second:0,millisecond:0});

const mapStateToProps = state => ({
  user: state.user,
});



class StartRide extends Component {
  constructor() {
    super();
    this.state = {
      showTime: true,
      timeElapsed: 0,
      startTime: null,
      endTime: null,
    }

  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    clockInterval = setInterval(this.update, 1000)
  }


  shouldComponentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }
  handleEnd = () => {
    this.setState({
      // showTime: false,
      endTime: moment().format()
    })
    clearInterval(clockInterval);
    
  }

  handleStart = () => {
    this.setState({
      showTime: false,
      startTime: moment().format()
    })
  }

  handleComplete = () => {
    this.props.dispatch({ type: 'ADD_DATA', payload: this.state })
    this.props.history.push('history');
  }

  update = () => {
    let duration = moment().diff(this.state.startTime)
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
      startButton = <button onClick={this.handleStart} className="start">Start Your Ride</button>;
      timer = '00:00:00';
    } else {
      startButton = <button onClick={this.handleEnd} className="stop" >End Ride</button>

      timer = this.state.timeElapsed;
    }



    return (
      <div>



        <br />


        Start your ride now!

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



