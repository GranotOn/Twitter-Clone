import React, { useEffect } from "react";

import "./Alert.css";

export default function Alert(props) {

  useEffect(() => {
    setTimeout(() => {
      props.dismiss();
    }, 5000)
  }, [props])
  return (
    <div className="alert">
      <h1>&#33;</h1>
      <p> {props.content} </p>
    </div>
  );
}
