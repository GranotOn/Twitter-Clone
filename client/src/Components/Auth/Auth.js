import React, { useState } from "react";
import "./Auth.scss";

import Modal from "../Modal/Modal.js";
import Alert from "../Alert/Alert.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

export default function Auth() {
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState(false);

  const closeModal = () => setModal(false);
  const closeAlert = () => setAlert(false);

  const handleAlert = (content) => {
    setAlert(content);
  }

  const signUpHandler = (e) => {
    setModal(<Register alert={handleAlert.bind(handleAlert)}/>);
  } 

  const signInHandler = (e) => {
    setModal(<Login alert={handleAlert.bind(handleAlert)}/>);
  }
  return (
    <>
    { alert && <Alert content={alert} dismiss={closeAlert.bind(this)}/>}
      <div className="auth">
        <div className="intro">
          <div className="item-list">
            <div className="item">
              <i className="fas fa-search"></i> <h3>Follow your interests.</h3>
            </div>
            <div className="item">
              <i className="fas fa-user-friends"></i>
              <h3>Hear what people are talking about.</h3>
            </div>
            <div className="item">
              <i className="far fa-comments"></i>
              <h3>Join the conversation.</h3>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="forms-confiner">
            <div className="logo"></div>
            <h2>See what's happening in the world right now</h2>
            <h4>Join Twitter-clone today.</h4>
            <div className="auth-buttons">
              <button className="btn btn-primary" onClick={signUpHandler}>Sign up</button>
              <br></br>
              <button className="btn btn-secondary" onClick={signInHandler}>Log in</button>
            </div>
            <div className="separator">
              <p>OR</p>
            </div>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
          </div>
        </div>
      </div>
      {modal && <Modal component={modal} close={closeModal.bind(closeModal)} />}
    </>
  );
}
