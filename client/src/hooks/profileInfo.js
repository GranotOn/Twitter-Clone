import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfileInfo(id) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_USER_ROUTE}/${id}`
      )
      .then((response) => setInfo(response.data))
      .catch((error) => setInfo(null));
    return () => {
      setInfo(null);
    };
  }, [id]);

  return info;
}
