import React from 'react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';  

type SwitchComponentProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Switch: React.FC<SwitchComponentProps> = ({ darkMode, toggleDarkMode })  => {

  return (
    <div className="switch-container">
      <div className={`switch ${darkMode ? 'checked' : ''}`} onClick={toggleDarkMode}>
        <div className="circle">
          {darkMode ? <FaRegMoon className="icon" /> : <FaRegSun className="icon" />}
        </div>
      </div>
    </div>
  );
};

export default Switch;