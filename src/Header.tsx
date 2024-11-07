import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import { Switch } from 'antd';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [searchParams] = useSearchParams();
  const themeType = searchParams.get("theme");
  const [darkMode, toggleTheme] = useState(themeType === "dark");
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    toggleTheme(!darkMode);
  };

  return (
    <div className={`correcalles ${darkMode ? "dark-theme" : ""}`} >
      <header className="header-container">
        <div className='header-menu page-width '>
          <Switch className={`switch-dark`} checked={darkMode} onChange={handleToggleTheme} />
          <h1 onClick={() => {navigate(`/home`)}}>Correcalles.gg</h1>
        </div>
      </header>
      <main className="page-width">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;