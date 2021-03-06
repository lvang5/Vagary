import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {Avatar, Grid, TextField, Button, ListSubheader, Paper} from '@material-ui/core';
import LoggedOut from '../Nav/LogoutNav';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('home');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div className="loginDiv">
      <LoggedOut/>
        {this.renderAlert()}
             <Paper style={{width: '350px', height: '350px', position: 'absolute',
            top: '35%',
            left: '40%',
            marginRight: '-50%',
            transform: ('-50%', '-50%'), }}>
          <ListSubheader component="h1" style={{margin: '0',
            position: 'absolute',
            top: '0%',
            left: '33%',
            marginRight: '-50%',
            transform: ('-50%', '-50%'),
            color:'black',
            fontSize:'1.5em',
            fontFamily: 'Tahoma, Geneva, sans-serif'}}>Login</ListSubheader>
              <form onSubmit={this.login} className="login">
      
      <div>
        Username:<TextField
               type="text"
               name="username"
               margin="normal"
              variant="outlined"
               value={this.state.username}
               onChange={this.handleInputChangeFor('username')}
            />
            <br/>
          
            Password: <TextField
               type="password"
               name="password"
               value={this.state.password}
               onChange={this.handleInputChangeFor('password')}
              margin="normal"
              variant="outlined"
            />
          
            <br/>
            {/* <Input placeholder="e.g. City" /> */}
            <Link to="/register" style={{ margin: '0'}}>Register</Link>
           <br/>
           <br/>
            
            {/* Find image for backgroud */}
            <Button variant="outlined"  type="submit"
              name="submit"
              value="Log In"
  style={{margin:'0'}}>Submit</Button>
      </div>
          
          </form>
  </Paper>
          {/* </React-Component> */}
    
      
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
