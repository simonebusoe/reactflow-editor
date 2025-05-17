import React from 'react';

const Toolbar = ({ onAddVariable, onAddFunction, onDeleteSelected, disableDelete, onSave, onLoad }) => {
  const buttonStyle = {
    padding: '6px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
  };

  return (
    <>
      <div style={{ padding: 10, background: '#fafafa', borderBottom: '1px solid #ddd' }}>
        <button onClick={onAddVariable}>➕ Add Variable</button>
        <button onClick={onAddFunction} style={{ marginLeft: 10 }}>➕ Add Function</button>
        <button onClick={onDeleteSelected} disabled={disableDelete} style={{ marginLeft: 10 }}>🗑️ Delete Selected</button>
      </div>
    </>
  );
};

export default Toolbar;
