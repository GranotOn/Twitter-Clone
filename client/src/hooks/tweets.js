import { useEffect, useState } from "react";

import axios from "axios";

export default function useTweets(id) {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TWEETS}/${id}`)
      .then((response) => setTweets(response))
      .catch((error) => setTweets(null));
    return () => {
      setTweets(null);
    };
  }, [id]);

  return tweets;
}
