import React from 'react';
import { FaRegMoon } from 'react-icons/fa';  
import { ImSun } from "react-icons/im";

type SwitchComponentProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Switch: React.FC<SwitchComponentProps> = ({ darkMode, toggleDarkMode })  => {

  return (
    <div className="switch-container">
      <div className={`switch ${darkMode ? 'checked' : ''}`} onClick={toggleDarkMode}>
        <div className="circle">
          {darkMode ? <FaRegMoon className="icon" /> : <ImSun className="icon" />}
        </div>
      </div>
    </div>
  );
};

export default Switch;