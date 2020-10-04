import React from "react";

import "./Feed.scss";

import Tweet from "../Tweet/Tweet.js";
import useFeed from "../../hooks/feed.js";

export default function Feed() {
  const feed = useFeed();
  return (
    <>
      <hr />
      <div className="feed">
        {feed && feed.map((tweet) => {
          return (
            <Tweet
              key={tweet.tweet_id}
              tweet_id={tweet.tweet_id}
              owner={tweet.username}
              owner_id={tweet.user_id}
              owner_profile={tweet.profile}
              content={tweet.content}
              comments={tweet.comments}
              likes={tweet.likes}
              create_time={tweet.create_time}
            />
          );
        })}
      </div>
    </>
  );
}
