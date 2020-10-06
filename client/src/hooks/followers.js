import { useEffect, useState } from "react";

import axios from "axios";

export default function useFollowers(id) {
  const [followers, setFollowers] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOLLOWERS}/${id}?full=true`)
      .then((response) => setFollowers(response.data[0]))
      .catch((error) => setFollowers(null));
    return () => {
      setFollowers(null);
    };
  }, [id]);

  return followers;
}
