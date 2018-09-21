import React, { Component } from 'react';
import { Button} from '@material-ui/core';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

class RideHistory extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }


  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  handleDone = () => {
    this.props.history.push('home');
}

  render() {
    return (
      <div>

        <h1>Ride History</h1>

        <Button variant="extendedFab" onClick={this.handleDone}>Finish</Button>
      </div>
    )
  }
}

const mapReduxStateToProps = (reduxState) => ({
  user: reduxState.user,

});
export default connect(mapReduxStateToProps)(RideHistory);