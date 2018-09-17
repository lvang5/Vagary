import React, { Component} from 'react';
import { Link } from 'react-router-dom';



class LoginNav extends Component{ 


  render(){
    return(
<div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/home">
            Vagary
          </Link>
        </li>
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
      </ul>
    </div>
  </div>
    );
  }
  
}

export default LoginNav;
