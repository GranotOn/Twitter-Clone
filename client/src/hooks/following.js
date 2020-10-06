import { useEffect, useState } from "react";

import axios from "axios";

export default function useFollowing(id) {
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOLLOWING}/${id}?full=true`)
      .then((response) => setFollowing(response.data[0]))
      .catch((error) => setFollowing(null));
    return () => {
      setFollowing(null);
    };
  }, [id]);

  return following;
}
