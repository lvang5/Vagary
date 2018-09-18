import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

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
            Rent your car!
          </Link>
        </li>
        <li>
          <Link to="/profile">
            Profile Icon
          </Link>
        </li>
        <li>
         <button
            onClick={this.logout}
          >
            <Link to="/home">
            Log Out
            {/* Change button and text */}
          </Link>
            
          </button>
        </li>
      </ul>
    </div>
  </div>
    );
  }
  
}

export default connect(mapStateToProps)(LoginNav);
