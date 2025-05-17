import React, { useState, useRef, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';

const SettingsMenu = ({ onSave, onLoad }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', marginLeft: 'auto', paddingRight: 12 }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
      >
        <FiSettings />
      </button>
      {showDropdown && (
        <div
            style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: 160, // ← increase this value as needed
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 6,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                padding: '8px 0',
            }}   
        >
          <label
            onClick={onSave}
            style={{
              display: 'block',
              padding: '8px 12px',
              width: '100%',
              textAlign: 'left',
              border: 'none',
              background: 'none',
            }}
          >
            💾 Save JSON
          </label>
          <label
            style={{
              display: 'block',
              padding: '8px 12px',
              width: '100%',
              textAlign: 'left',
              border: 'none',
              background: 'none',
            }}
          >
            📥 Load JSON
            <input type="file" accept=".json" onChange={onLoad} style={{ display: 'none' }} />
          </label>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
