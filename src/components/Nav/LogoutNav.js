import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogOutNav extends Component {
  render() {
    return (
      <div className="navbar">
      <div>
        <ul>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </div>
    )
  }
}

export default LogOutNav;