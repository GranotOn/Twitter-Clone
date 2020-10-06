import { useState, useEffect } from "react";

import axios from "axios";

export default function useFindId(name) {
  const [id, setId] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}${process.env.REACT_APP_USER_ROUTE}/getId?name=${name}`
      )
      .then((response) => {
        setId(response.data);
      })
      .catch((error) => {
        setId(null);
      });
    return () => {
      setId(null);
    };
  }, [name]);

  return id;
}
