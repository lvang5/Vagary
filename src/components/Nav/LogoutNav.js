import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogOutNav extends Component {
  render() {
    return (
      <div className="navbar">
      <div>
        <ul className="center_nav">
        <li>
            <Link to="/home">
              VAGARY 
            </Link>
          </li>
          <li>
            <Link to="/login">
              LOGIN
            </Link>
          </li>
          <li>
            <Link to="/register">
              SIGN UP
            </Link>
          </li>
        </ul>
      </div>
    </div>
    )
  }
}

export default LogOutNav;