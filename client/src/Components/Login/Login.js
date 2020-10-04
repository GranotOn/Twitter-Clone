import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./Login.scss";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const nameHandler = (e) => setName(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: name,
      password: password,
    };

    axios
      .post(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_USER_ROUTE}/auth`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        history.push("/home");
      })
      .catch((err) => props.alert((err) ? err.response.data.message : "Server is offline"));
  };

  return (
    <div className="login">
      <i className="fab fa-twitter fa-2x logo"></i>
      <h2 className="title">Welcome back!</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="username">
          <input
            htmlFor="username"
            type="text"
            minLength="1"
            maxLength="16"
            required
            value={name}
            onChange={nameHandler}
          ></input>
          <span className="floating-label">
            <p>Name</p>
          </span>
        </div>
        <div className="password">
          <input
            htmlFor="password"
            type="password"
            minLength="8"
            maxLength="16"
            value={password}
            onChange={passwordHandler}
            required
          ></input>
          <span className="floating-label">
            <p>Password</p>
          </span>
        </div>
        <button className="btn btn-primary" type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}
