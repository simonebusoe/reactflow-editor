import React, { useEffect, useState } from 'react';

const variableTypes = [
  'U8', 'I8', 'U16', 'I16', 'U32', 'I32',
  'U64', 'I64', 'F32', 'F64', 'STRUCT'
];

const SidePanel = ({ node, onClose, onUpdate }) => {
  if (!node) return null; // safeguard
  
  const [name, setName] = useState(node.data.label || '');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [varType, setVarType] = useState(node.data.varType || 'F32');

  useEffect(() => {
    setName(node.data.label || '');
    setVarType(node.data.varType || 'F32');
    setInput((node.data.input || []).join(', '));
    setOutput((node.data.output || []).join(', '));
  }, [node.id]);

  const handleUpdate = () => {
    const update = { label: name };
    if (node.type === 'function') {
      update.input = input.split(',').map((s) => s.trim());
      update.output = output.split(',').map((s) => s.trim());
    }
    if (node.type === 'variable') {
      update.varType = varType;
    }
    onUpdate(node.id, update);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        zIndex: 10,
        width: 320,
        borderLeft: '1px solid #ccc',
        backgroundColor: '#f7f9fa',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: 'sans-serif',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.05)',
      }}
    >
      <h3 style={{ marginBottom: 4 }}>🛠 Edit Node</h3>

      <div>
        <label style={{ fontWeight: 'bold' }}>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate();
              e.target.blur();
            }
          }}
          style={{
            width: '100%',
            padding: '6px 8px',
            marginTop: 4,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
      </div>

      {node.type === 'variable' && (
        <div>
          <label style={{ fontWeight: 'bold' }}>Type:</label>
          <select
            value={varType}
            onChange={(e) => {
              setVarType(e.target.value);
              onUpdate(node.id, { varType: e.target.value });
            }}
            style={{
              width: '100%',
              padding: '6px 8px',
              marginTop: 4,
              border: '1px solid #ccc',
              borderRadius: 4,
            }}
          >
            {variableTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      )}

      {node.type === 'function' && (
        <>
          <div>
            <label style={{ fontWeight: 'bold' }}>Input (comma separated):</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={handleUpdate}
              style={{
                width: '100%',
                padding: '6px 8px',
                marginTop: 4,
                border: '1px solid #ccc',
                borderRadius: 4,
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 'bold' }}>Output (comma separated):</label>
            <input
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              onBlur={handleUpdate}
              style={{
                width: '100%',
                padding: '6px 8px',
                marginTop: 4,
                border: '1px solid #ccc',
                borderRadius: 4,
              }}
            />
          </div>
        </>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: 8,
          alignSelf: 'flex-end',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '6px 12px',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  );
};

export default SidePanel;
