import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/login/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="Username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          {/* <div>
            <label >
              First Name:
              <input
                type="text"
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input
                type="text"
              
              />
            </label>
          </div>
          <div>
            <label >
              Street Address:
              <input
                type="text"
              />
            </label>
          </div>
          <div>
            <label >
              City:
              <input
                type="text"
              />
            </label>
          </div>
          <div>
            <label >
              State:
              <input
                type="text"
              />
            </label>
          </div>
          <div>
            <label >
              Zipcode:
              <input
                type="number"
              />
            </label>
          </div>
          <div>
            <label>
              Credit Card Number:
              <input
                type="number"
              />
            </label>
          </div>
          <div>
            <label>
              Expiration Month:
              <input
                type="number"
              />
            </label>
          </div>

              <div>
            <label >
              Expiration Month:
              <input
                type="number"
              />
            </label>
          </div>
          <div>
            <label>
              Expiration Year:
              <input
                type="number"
              />
            </label>
          </div>
          <div>
            <label>
              Security Code:
              <input
                type="number"
              />
            </label>
          </div> */}


          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/login">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

