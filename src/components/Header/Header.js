import React, { Component } from 'react';
import LoginNav from '../Nav/LoginNav.js';
import LogoutNav from '../Nav/LogoutNav.js';

// if(user === loggedin) {
//   user loginNav
// }else {
//   loggoutNav
// }


class Header extends Component {
  handleClick = () => {
    this.props.history.push('home');
  }

  render() {
    return (
      <div className="instructions">
        <div>
          <h1 className="lead" > <button onClick={this.handleClick}> Vagary</button> </h1>
        </div>
        <LogoutNav />
      </div>

    );
  }
}
export default Header;
