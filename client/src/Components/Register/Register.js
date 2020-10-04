import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./Register.scss";

export default function Register(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    const data = {
      username: name,
      password: password,
      email: email,
    };
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_USER_ROUTE}`,
        data
      )
      .then((res) => {
        history.push("/login");
        console.log(res.data);
      })
      .catch((err) => {
        props.alert(err.response.data.message);
      });
  };

  const nameHandler = (e) => setName(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);

  return (
    <div className="register">
      <i className="fab fa-twitter fa-2x logo"></i>
      <h2 className="title">Create your account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
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
        <div className="email">
          <input
            htmlFor="email"
            type="email"
            value={email}
            onChange={emailHandler}
            required
          ></input>
          <span className="floating-label">
            <p>Email</p>
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
          Register
        </button>
      </form>
    </div>
  );
}
