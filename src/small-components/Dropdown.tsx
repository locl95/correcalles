import React, { useState } from "react";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface DropdownProps {
  defaultType: string;
  setType: (type: string) => void; 
}

const Dropdown: React.FC<DropdownProps> = ({ defaultType, setType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (type: string) => {
    setType(type);
    setIsOpen(false);
  };

  return (
    <div className="tabs-dropdown">
      <button onClick={toggleDropdown}>
        {defaultType} {!isOpen ? <DownOutlined /> : <UpOutlined />}
      </button>
      {isOpen && (
        <div className="items">
          <div className="item" onClick={() => handleItemClick("SOLO")}>SOLO</div>
          <div className="item" onClick={() => handleItemClick("FLEX")}>FLEX</div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;