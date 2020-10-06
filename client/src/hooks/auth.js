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
        localStorage.setItem("id", response.data.id);
        setConnected(true);
      })
      .catch((error) => {
        localStorage.removeItem("id");
        setConnected(false);
      });
    return () => {
      localStorage.removeItem("id");
      setConnected(false);
    };
  },[]);

  return connected;
}
