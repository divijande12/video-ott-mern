import React from 'react'
import './App.css';
import { Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import adminDashboard from './components/adminDashboard';
import Logout from './components/Logout';



export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/admin-dashboard" component={adminDashboard} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </React.Fragment>
    )
  }
}
