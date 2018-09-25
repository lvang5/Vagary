import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, GridListTile, ListSubheader, TextField, OutlinedInput, Input, Paper } from '@material-ui/core'

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      first: '',
      last: '',
      email: '',
      profile_pic: '',
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
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        profile_picture: this.state.profile_pic
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/login/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/login');
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

       
         <div className="reg-Form">
         {this.renderAlert()}

<Grid container spacing={16} direction="column" align="center">
<Paper style={{width: '350px'}}>
  <ListSubheader component="h1" style={{color:'black', fontSize:"2em"}}>Registration</ListSubheader>

  <form onSubmit={this.registerUser}>
    {/* get input values */}
    <Grid item xs={6}>
      <TextField
        label="Username"
        margin="normal"
        type="text"
        name="username"
        value={this.state.username}
        onChange={this.handleInputChangeFor('username')} />
      <br />
      <TextField
        label="Password"
        margin="normal"
        type="password"
        name="password"
        value={this.state.password}
        onChange={this.handleInputChangeFor('password')}/>
      <br />
      <TextField
        label="First Name"
        margin="normal"
        onChange={this.handleInputChangeFor('first')} type="text" name="first" value={this.state.first} />
      <br />
      <TextField
        label="Last Name"
        margin="normal"
        onChange={this.handleInputChangeFor('last')} type="text" name="last" value={this.state.last} />
      <br />
      <TextField
        label="Email address"
        margin="normal"
        onChange={this.handleInputChangeFor('email')} type="text" name="email" value={this.state.email} />
      <br />
      <TextField
        label="Profile Picture"
        margin="normal"
        onChange={this.handleInputChangeFor('profile_pic')} type="text" name="profile_picture" value={this.state.profile_pic} />
      {/* move button to far right */}

    </Grid>
    <input
              type="submit"
              name="submit"
              value="Register"
            
            />
            
  </form>
  <div>
           
            <label>
            <Link to="/login">Cancel</Link>
            </label>
          </div>
          </Paper>  
</Grid>

{/* { content } */}
</div>
        
       
       
    );
  }
}

export default RegisterPage;


