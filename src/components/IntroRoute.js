import React from 'react';
import { useHistory } from 'react-router-dom';

const IntroRoute = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/chat"); // Redirect to the loggedchat page
  }

  return (
    <div className="intro-page">
      <h2>Welcome to Our Imaginative Website</h2>
      <p>
        This is a place where your imagination can run wild! Explore and create with us.
      </p>
      <button className="intro-button" onClick={handleClick}>Use your imagination</button>
    </div>
  );
};

export default IntroRoute;
