import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./Components/Login/Login";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import useAuth from "./hooks/auth.js";
import "./App.css";

function App() {
  const connected = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/profile">
          <h1>Profile</h1>
        </Route>
        <Route path="/login">
          <div className="center">
            <Login />
          </div>
        </Route>
        <Route path="/">
          <div className="App">
            {connected ? <Redirect to="/home"></Redirect> : <Auth />}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
