import React from "react";
import "./Modal.scss";

export default function Modal(props) {
  const clickHandler = (e) => {
    if (e.target.className === "modal-container") {
      props.close();
    }
  };
  return (
    <div className="modal-container" onClick={clickHandler}>
      <div className="modal"> { props.component } </div>
    </div>
  );
}
