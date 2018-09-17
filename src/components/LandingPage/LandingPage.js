import React, { Component } from 'react';




// import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';


// const mapStateToProps = state => ({
//   user: state.user,
// });

class LandingPage extends Component {
  // componentDidMount() {
  //   this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  // }

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }

  // logout = () => {
  //   this.props.dispatch(triggerLogout());
  // }
    // let content = null;

    // if (this.props.user.userName) {
    //   content = (
     
    //   );

  render() {
  
    return (
      
       
      <div>
         Welcome to the landing 

         {/* <h1
           id="welcome"
         >
         This is the landing page
           Welcome to Vagary, { this.props.user.userName }!
         </h1>
         <p>Your ID is: {this.props.user.id}</p>
         <button
           onClick={this.logout}
         >
           Log Out
         </button> */}
       </div>
    
   );
 
    }

    
}

// this allows us to use <App /> in index.js
export default (LandingPage);

