import React from 'react';
import LoginNav from '../Nav/LoginNav.js';
import LogoutNav from '../Nav/LogoutNav.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userInfo } from 'os';

// if(user === loggedin) {
//   user loginNav
// }else {
//   loggoutNav
// }

const mapStateToProps = state => ({
  user: state.user,
});

const Header = ({ title, user }) => (
  <div className="instructions">
    <div>
      <h1 className="lead">
        <Link to="/home" className="header">
          {title}
          
        </Link>
        
      </h1>
    </div>
    {/* Conditional rendering */}
    {user.userName ? (
      <LogoutNav />
    ) : (
      <LoginNav />
      
    )}
    
  </div>
);

export default connect(mapStateToProps)(Header);
