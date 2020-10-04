import React, { useState } from "react";

import "./Tweet.scss";

import useTime from "../../hooks/time.js";
import Info from "../Info/Info.js";

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
  const [nameHover, setNameHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);

  const toggleNameHover = () => setNameHover(!nameHover);
  const toggleProfileHover = () => setProfileHover(!profileHover);

  return (
    <>
      <div className="tweet">
        <div
          className="logo-container"
          onMouseEnter={toggleProfileHover}
          onMouseLeave={toggleProfileHover}
        >
          <img src={owner_profile} alt="user_picture" className="logo" />
          {profileHover && (
            <Info name={owner} id={owner_id} profile={owner_profile} />
          )}
        </div>

        <div className="content">
          <div className="header">
            <h3
              className="owner"
              onMouseEnter={toggleNameHover}
              onMouseLeave={toggleNameHover}
            >
              {owner}

              {nameHover && (
                <Info name={owner} id={owner_id} profile={owner_profile} />
              )}
            </h3>
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
