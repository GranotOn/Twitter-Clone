import React from "react";

import "./Info.scss";

export default function Info({ name, id, profile }) {
  const isUserFollowingName = false;
  const followers = 50;
  const following = 30;

  return (
    <div className="info-container">
      <div className="user-info">
        <div className="header">
          <img src={profile} alt="user_profile" className="profile" />
          <button
            className={`btn + ${
              isUserFollowingName ? "btn-primary" : "btn-secondary"
            }`}
          >
            {isUserFollowingName ? "Following" : "Follow"}
          </button>
        </div>
        <div className="body">
          <h4 className="name">{name}</h4>
        </div>
        <div className="footer">
          <p className="following">
            {following} <span>Following</span>
          </p>
          <p className="followers">
            {followers} <span>Followers</span>
          </p>
        </div>
      </div>
    </div>
  );
}
