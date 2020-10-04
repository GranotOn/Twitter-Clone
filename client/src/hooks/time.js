import { useState, useEffect } from "react";

export default function useTime(rawTime) {
    const [time, setTime] = useState(null);
    useEffect(() => {
        // Split timestamp into [ Y, M, D, h, m, s ]
        const t = rawTime.replace("T", " ").replace("Z","").split(/[- :]/);

        // Apply each element to Date (UTC)
        const d =  new Date(Date.UTC(t[0], t[1] - 1,t[2],t[3],t[4],t[5]));

        // Date atm
        const n = new Date();

        const diff = Math.abs(n - d);
        const minutes = Math.round(diff / (1000 * 60))
        const hours = Math.round(minutes / 60);
        const days = Math.floor(minutes / 24);

        if (minutes < 60) setTime(`${minutes} minutes ago.`)
        else if (hours < 24) setTime(`About ${hours} hours ago.`)
        else setTime(`About ${days} days ago.`)

        return () => {
            setTime(null);
        }
    }, [time, rawTime, setTime])

    return time;
}