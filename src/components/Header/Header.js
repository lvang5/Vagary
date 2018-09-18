import React from 'react';
import LoginNav from '../Nav/LoginNav.js';
import LogoutNav from '../Nav/LogoutNav.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userInfo } from 'os';


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
    {/* Conditional rendering to toggle Navigation bar*/}
    {user.userName ? (
      <LoginNav />
    ) : (
      <LogoutNav />
      
    )}
    
  </div>
);

export default connect(mapStateToProps)(Header);
