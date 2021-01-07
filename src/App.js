import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import HomePage from './Components/Home/Index';
import LoginPage from './Components/LoginPage/LoginPage';
import Registration from './Components/LoginPage/Register.js';
import './App.css';

const Home = () => (
  <HomePage />
);

const Login = () => (
  <LoginPage />
);
const Register = () => (
  <Registration />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/home" render={() => { return <Home /> }} />
            <Route path="/register" render={() => { return <Register /> }} />
            <Route path="/" render={() => { return <Login /> }} />            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;