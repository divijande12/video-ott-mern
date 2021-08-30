import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard";
import AdminDashboard from "./components/adminDashboard";
import Logout from "./components/Logout";
import VideoPlayer from "./components/VideoPlayer";
import { ProtectedRoute } from "./ProtectedRoutes";
import NotFound from "./components/Not_Found/404route";
import AddVideo from "./components/adminDashboard/addvideo";

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/video/play" component={VideoPlayer} />
          <ProtectedRoute
            exact
            path="/admin-dashboard"
            component={AdminDashboard}
          />
          <Route exact path="/addVideo" component={AddVideo} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}
