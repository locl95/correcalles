import React, { ReactNode } from "react";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void; 
  children: ReactNode;
  className?: string; 
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose, children, className }) => {
  if (!isVisible) return null;

  return (
    <div className={`overlay ${className || ""}`} onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;