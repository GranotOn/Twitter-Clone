import React from "react";
import Nav from "../Nav/Nav";
import "./Home.scss";

import Post from "../Post/Post.js";
import Feed from "../Feed/Feed.js";

import useProfile from "../../hooks/profile";

export default function Home() {
  const profile = useProfile();
  
  return (
    <div className="home">
      <Nav active="home" />
      <div className="middle">
        <div className="fixed-title">
          <h3>Home</h3>
        </div>
        <Post profile={profile} />
        <hr className="hr-big"></hr>
        <Feed />
      </div>
    </div>
  );
}
