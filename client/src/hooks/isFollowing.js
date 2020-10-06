import { useEffect, useState } from "react";
import axios from "axios";

export default function useIsFollowing(id) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_IS_FOLLOWING}/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsFollowing(response.data);
      })
      .catch((error) => {
        setIsFollowing(false);
        console.warn(error.response);
      });
    return () => {
      setIsFollowing(false);
    };
  }, [id]);

  return isFollowing;
}
