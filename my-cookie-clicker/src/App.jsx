import React, { useState, useEffect } from 'react';
import './App.css';
import musicFile from './assets/music/Komiku-PoupiGreatAdventuresTheArcadeGame.mp3';

function App() {
  // State for cookie count
  const [cookies, setCookies] = useState(parseInt(localStorage.getItem('cookies')) || 0);
  // State for cookies per second
  const [cookiesPerSecond, setCookiesPerSecond] = useState(
    parseInt(localStorage.getItem('cookiesPerSecond')) || 1
  );
  // State for game items in the shop
  const [items, setItems] = useState([
    { name: 'Grandma👵🏻', cost: 10, increment: 1 },
    { name: 'Oven🔥', cost: 100, increment: 10 },
    { name: 'Factory🏭', cost: 1000, increment: 100 },
    { name: 'Mine🙋🏻‍♂', cost: 10000, increment: 1000 },
    { name: 'Bank🏧', cost: 100000, increment: 10000 }
  ]);

  // State for music player
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Using 'audio' state to handle audio element
  const [audio] = useState(new Audio(musicFile));
  audio.loop = true;

  // Function to toggle music play/pause
  const toggleMusic = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Effect for automatic cookie increment
  useEffect(() => {
    const timer = setInterval(() => {
      setCookies((prevCookies) => prevCookies + cookiesPerSecond);
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [cookiesPerSecond]);

  // Function to handle item purchase from the shop
  const purchaseItem = (item) => {
    if (cookies >= item.cost) {
      setCookies((prevCookies) => prevCookies - item.cost);
      setCookiesPerSecond((prevCookiesPerSecond) => prevCookiesPerSecond + item.increment);
    }
  };

  // Function to handle game reset
  const handleReset = () => {
    setCookies(0);
    setCookiesPerSecond(1);
  };

  // Effect to update local storage and cookie for every change in cookies or cookies per second
  useEffect(() => {
    localStorage.setItem('cookies', cookies.toString());
    localStorage.setItem('cookiesPerSecond', cookiesPerSecond.toString());

    // Setting a cookie in the document
    document.cookie = `amp_cookie_testsWGCz5kEKyrUnZhQDpHAwC=${cookies}; SameSite=None; Secure`;
  }, [cookies, cookiesPerSecond]);

  return (
    <div className="App">
        <div className="music-controls">
          <button className="music-button" onClick={toggleMusic}>
            {isMusicPlaying ? 'Pause Music' : 'Play Music'}
          </button>
      </div>
      <h1 className="title">Cookie Clicker</h1>
      <aside className="story-aside">
        <h2>Once Upon a Time in Cookie Land...</h2>
        <p>Welcome to Cookie Land, a magical place filled with delicious treats and endless opportunities for cookie-clicking adventures. In this land, you have the power to click your way to cookie glory!</p>
        <p>Embark on a journey, click on the giant cookie, and watch as your cookie count rises. Explore the mystical shop where you can exchange your hard-earned cookies for amazing items that will boost your cookie production.</p>
        <p>Are you ready to become the ultimate Cookie Clicker? Start clicking now and let the cookie madness begin!</p>
      </aside>
      <aside className="rules-aside">
      <h2>Game Rules</h2>
      <p>🐿️ Click the cookie button to increment the counter.</p>
      <p>🕒 The counter automatically increments using an interval timer.</p>
      <p>🍪 Purchase items from the shop to increase cookies every interval.</p>
      </aside>
      <p className='line'>👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾</p>
      <p className="cookie-count">Cookies: {cookies}</p>
      <p className="cps">Cookies Per Second: {cookiesPerSecond}</p>
      <button className="click-button" onClick={() => setCookies((prevCookies) => prevCookies + 1)}>
        Click me!🍪
      </button>
      <div id="shop" className="shop">
        <h2 className="shop-title">Shop</h2>
        {items.map((item, index) => (
          <div key={index} className="shop-item">
            <p>{item.name}</p>
            <p>Cost: {item.cost} cookies</p>
            <p>Increment: {item.increment} cookies per second</p>
            <button onClick={() => purchaseItem(item)}>Buy</button>
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset</button>
      <footer className="footer">
        <div className="footer-nav">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Cookie Clicker. All rights reserved.</p>
        </div>
        <div className="footer-disclaimer">
          <p>This website is for fun purposes only.</p>
        </div>
        <div className="footer-subscribe">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <div className="footer-back-to-top">
          <a href="#top">Back to Top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;