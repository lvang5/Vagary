import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Button} from '@material-ui/core';
const mapStateToProps = state => ({
  user: state.user,
});
class LoginNav extends Component{ 

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
      this.props.dispatch(triggerLogout());
  }



  render(){
    return(
<div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/rent">
            RENT CAR
          </Link>
        </li>
        <li>
          <Link to="/garage">
            GARAGE
          </Link>
        </li>
        <li>
         <Button
            onClick={this.logout}
            style={{bottom:'7px',
            textAlign: 'center',
            float: 'left',
            fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,}}
          >
            <Link to="/home">
            Log Out
            {/* Change button and text */}
          </Link>
            
          </Button>
        </li>
      </ul>
    </div>
  </div>
    );
  }
  
}

export default connect(mapStateToProps)(LoginNav);
