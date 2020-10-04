import { useState, useEffect } from "react";
import axios from "axios";

export default function useFeed(limit = 10, offset = 0) {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_FEED, {
        params: { limit, offset },
        withCredentials: true,
      })
      .then((response) => setFeed(response.data))
      .catch((error) => {
        console.warn(error);
        setFeed(null);
      });
    return () => {
      setFeed(null);
    };
  }, [setFeed, limit, offset]);

  return feed;
}
