import React, { useState, useRef } from "react";

import "./Post.scss";

export default function Post({ profile }) {
  const [content, setContent] = useState("");
  const btnEl = useRef();

  const handleContent = (e) => {
    setContent(e.target.value);
    if (content === null) {
      btnEl.current.style.opacity = 0.5;
      btnEl.current.style.pointerEvents = "none";
    } else {
      btnEl.current.style.opacity = 1;
      btnEl.current.style.pointerEvents = "auto";
    }
  };

  return (
    <div className="post">
      <img src={profile} alt="user_picture" className="logo" />
      <div className="body">
        <textarea
          maxLength="128"
          placeholder="What's happening?"
          value={content}
          onChange={handleContent}
        ></textarea>
        <button ref={btnEl} className="btn-tweet">
          Tweet
        </button>
      </div>
    </div>
  );
}
