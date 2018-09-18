import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LandingPage from './components/LandingPage/LandingPage.js';
import CarForm from './components/CarForm/CarForm.js';
import ViewCars from './components/ViewCars/ViewCars.js'
import StartRide from './components/StartRide/StartRide.js';
import RideHistory from './components/RideHistory/RideHistory.js';
import Feedback from './components/Feedback/Feedback.js';
import UserProfile from './components/UserProfile/UserProfile.js'
import './styles/main.css';



const App = () => (
 <div>
   
    <Router>
    <div>
    <Header title="Vagary"/>
      <Switch>
        
    
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LandingPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/rent"
          component={CarForm}
        />
        <Route
          path="/view"
          component={ViewCars}
        />
        <Route
          path="/start"
          component={StartRide}
        />
        <Route
          path="/history"
          component={RideHistory}
        />
        <Route
          path="/feedback"
          component={Feedback}
        />
        <Route
          path="/profile"
          component={UserProfile}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
      </div>
    </Router>
</div>
);

export default App;
