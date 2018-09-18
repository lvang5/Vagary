import React, { Component } from 'react';
import { connect } from 'react-redux';


import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class CarForm extends Component {

  constructor() {
    super()
    this.state = {
      car: { make: '',
      model: '',
      color: '',
      year: '',
      city: '',
      state: '',
      latitude: '',
      longitude: '',


      }
    }
  }
  // componentDidMount() {
  //   this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  // }

  // componentDidUpdate() {
  //   if (!this.props.user.isLoading && this.props.user.userName === null) {
  //     this.props.history.push('home');
  //   }
  // }

  render() {
    // let content = null;

    // if (this.props.user.userName) {
    //   content = (
    //     <div>
    //       <p>
    //        Rent your car
    //       </p>
    //     </div>
    //   );
    // }

    return (
      <div>
        <h1> Car Form </h1>
        <form>
          {/* get input values */}
          <input placeholder="Make" /> <br />
          <input placeholder="Model" /> <br />
          <input placeholder="Color" /> <br />
          <input placeholder="Year" /> <br />
          <input placeholder="City" /> <br />
          <input placeholder="State" /> <br />
          <input placeholder="Latitude" /> <br />
          <input placeholder="Longitude" /> <br />
          {/* move button to far right */}
          <input type="submit" />
        </form>

        {/* { content } */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CarForm);
