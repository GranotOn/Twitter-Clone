import { useState, useEffect } from "react";
import axios from "axios";

export default function useProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
    .get(process.env.REACT_APP_PROFILE, {
        withCredentials: true,
      })
      .then((response) => setProfile(response.data.profile))
      .catch((error) => console.log(error.response));
    return () => {
      setProfile(null);
    };
  }, []);

  return profile;
}
