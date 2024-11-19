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
          <p>© 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;