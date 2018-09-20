import React, { Component } from 'react'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import Clock from 'react-live-clock';
import Stopwatch from 'react-stopwatch';




import { USER_ACTIONS } from '../../redux/actions/userActions';
let curTime;


const mapStateToProps = state => ({
  user: state.user,
});



class StartRide extends Component {
  constructor() {
    super();
    this.state = { 
      showTime: false
         }
                  
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
   
  }



  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }
  handleEnd = () => {
    this.props.history.push('history');

  }

  handleStart = () => {
    this.setState({
      showTime: !this.state.showTime,
    })
  
  }


  render() {

    if (this.state.showTime) {
   
     
      curTime =   <Stopwatch
      seconds={0}
      minutes={0}
      hours={0}
      limit={"00:00:10"}
      withLoop={true}
      onCallback={() => console.log('Finish')}
     />
    }
    return (
      <div>

        
  
        <br/>
    
  	
        Start your ride now!

        <br />
        {this.state.timer}
          
        <button onClick={this.handleStart}>Start Your Ride</button>
        <button onClick={this.handleEnd} >End Ride</button>
        <div>{curTime}</div>
      </div>
    )
  }
}


export default connect(mapStateToProps)(StartRide);