import React, { Component } from 'react'
import { connect } from 'react-redux';



import { USER_ACTIONS } from '../../redux/actions/userActions';



const mapStateToProps = state => ({
  user: state.user,
});



class StartRide extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }
  handleClick = () => {
    this.props.history.push('history');
  }

  render() {
    return (
      <div>
        Start your ride now!

        <button>Start Ride</button>
        <button onClick={this.handleClick} >End Ride</button>
      </div>
    )
  }
}


export default connect(mapStateToProps)(StartRide);