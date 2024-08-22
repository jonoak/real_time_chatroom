import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css'; // Add CSS for the navigation bar

function NavigationBar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
      });
  };

  return (
    <div className="navigation-bar">
      <button onClick={goHome}>Home</button>
      <button onClick={copyLink}>Share</button>
    </div>
  );
}

export default NavigationBar;

