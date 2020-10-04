import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "./Nav.css"

export default function Nav(props) {
    let history = useHistory();

    // Set active link
    useEffect(() => {
        if (!props.active) return
        const id = props.active;
        const target = document.querySelector(`#${id}`);

        target.classList.add("active");
    }, [props.active])

    // Clicked on a navigation link
    function handleClick(e) {
        const path = e.target.id;
        if (path === props.active) return;
        history.push(`/${path}`);
    }

    // Clicked on create a tweet
    function handleTweet(Ss) {
        return;
    }
    return (
        <nav className="nav"> 
            <div className="nav-home nav-item" onClick={handleClick}><i className="fas fa-home fa-2x" id="home"></i><h4>Home</h4></div>
            <div className="nav-profile nav-item" onClick={handleClick}><i className="far fa-user-circle fa-2x" id="profile"></i><h4>Profile</h4></div>
            <div className="nav-notifications nav-item" onClick={handleClick}><i className="far fa-bell fa-2x" id="notifications"></i><h4>Notifications</h4></div>
            <div className="nav-trending nav-item" onClick={handleClick}><i className="fab fa-hotjar fa-2x" id="trending"></i><h4>Trending</h4></div>
            <div className="nav-tweet nav-item" onClick={handleTweet}><i className="far fa-edit fa-2x"><div className="plus"></div></i></div>
        </nav>
    );
}