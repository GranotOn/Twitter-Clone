import React from "react";

import "./Tweet.scss";

import useTime from "../../hooks/time.js";

export default function Tweet({
  tweet_id,
  owner,
  owner_id,
  owner_profile,
  content,
  comments,
  likes,
  create_time,
  ...props
}) {
  const time = useTime(create_time);
  return (
    <>
      <div className="tweet">
        <img src={owner_profile} alt="user_picture" className="logo" />
        <div className="content">
          <div className="header">
            <h3 className="owner">{owner}</h3>
            <p className="time">{time}</p>
          </div>
          <div className="body">
            <h4>{content}</h4>
          </div>
          <div className="footer">
            <div className="comments">
              <i className="far fa-comment fa-xs"></i>
              <span>{comments}</span>
            </div>
            <div className="likes">
              <i className="far fa-heart fa-xs"></i>
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
