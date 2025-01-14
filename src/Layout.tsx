import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Switch } from 'antd';
import { useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const [darkMode, toggleTheme] = useState(false);
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    toggleTheme(!darkMode);
  };

  return (
    <div className={`correcalles ${darkMode ? "dark-theme" : ""}`} >
      <header className="header-container">
        <div className='header-menu correcalles-width'>
          <Switch className={`switch`} checked={darkMode} onChange={handleToggleTheme} />
          <h1 onClick={() => {navigate(`/`)}}>Correcalles.gg</h1>
        </div>
      </header>
      <main className="page correcalles-width pt-20">
        <Outlet />
      </main>
      <footer className="footer-container">
        <div className='footer-content correcalles-width'> 
          <p className='kofi-button'>
            <a
                href="https://ko-fi.com/Q5Q815ZBU4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
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