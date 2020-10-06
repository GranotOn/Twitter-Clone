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
import Profile from "./Components/Profile/Profile";
import useAuth from "./hooks/auth";
import "./App.css";

function App() {
  const connected = useAuth();

  return (
    <Router>
      <Switch>
        {connected && <Route path="/home" exact component={Home} />}
        {connected && <Route path="/profile/:name" exact component={Profile} />}
        {!connected && <Route path="/login" component={Login} />}
        <Route path="*" exact>
          {connected ? <Redirect to="/home" /> : <Auth />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
