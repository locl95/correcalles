import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MySwitch from './small-components/Switch';

const Layout: React.FC = () => {
  const [darkMode, toggleTheme] = useState(JSON.parse(Cookies.get("darkMode") || "false"));
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    toggleTheme(!darkMode);
    Cookies.set("darkMode", (!darkMode).toString(), { expires: 365 });
  };

  return (
    <div className={`correcalles ${darkMode ? "dark-theme" : ""}`} >
      <header className="header-container">
        <div className='header-menu correcalles-width'>
          <MySwitch darkMode={darkMode} toggleDarkMode={handleToggleTheme} />
          <h1 onClick={() => {navigate(`/`)}}>Correcalles.gg</h1>
        </div>
      </header>
      <main className="page correcalles-width pt-20">
        <Outlet context={{ darkMode }} />
      </main>
      <footer className="footer-container">
        <div className='footer-content correcalles-width'> 
          <p className='kofi-button'>
            <a
                href="https://ko-fi.com/Q5Q815ZBU4"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/icons/kofi.svg"
                    alt="Buy Me a Coffee at ko-fi.com"
                    className="h-5 w-5"
                />
                <span>Fuel up the squad with sushi</span>
            </a>
          </p>
          <p className="right-deserved">© 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;