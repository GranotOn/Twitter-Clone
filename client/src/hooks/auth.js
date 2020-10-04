import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_AUTH, {
        withCredentials: true,
      })
      .then((response) => {
        setConnected(true);
      })
      .catch((error) => {
        setConnected(false);
      });
    return () => {
      setConnected(false);
    };
  },[]);

  return connected;
}
