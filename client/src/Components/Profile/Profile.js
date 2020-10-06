import React from "react";

import Nav from "../Nav/Nav.js";

import "./Profile.scss";

import useId from "../../hooks/findId";
import useProfileInfo from "../../hooks/profileInfo";
import useFollowers from "../../hooks/followers";
import useFollowing from "../../hooks/following";
import useTweets from "../../hooks/tweets";

export default function Profile(props) {
  const name = props.match.params.name;
  const id = useId(name);
  const userInfo = useProfileInfo(id);
  const followers = useFollowers(id);
  const following = useFollowing(id);
  const tweets = useTweets(id);
  console.log(userInfo);
  const isMyProfile =
    userInfo && parseInt(localStorage.getItem("id")) === userInfo.user_id;

  return (
    <div className="profile-container">
      <Nav active={isMyProfile && "profile"} />
      <div className="profile">
        <div className="showcase">
            <img src={userInfo && userInfo.profile} alt="user_logo" className="logo"/>
            <h3 className="name">{userInfo && userInfo.username}</h3>
        </div>
      </div>
    </div>
  );
}
