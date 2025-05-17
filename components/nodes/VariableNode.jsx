import React from 'react';
import { Handle } from 'reactflow';

const VariableNode = ({ data, selected }) => (
  <div
    style={{
      padding: 10,
      border: selected ? '2px solid #007bff' : '1px solid #ccc',
      borderRadius: 8,
      background: 'white',
      position: 'relative',
    }}
  >
    <Handle type="target" position="left" id="input" isConnectable={true} />
    🧮 {data.label}
    <Handle type="source" position="right" id="output" isConnectable={true} />
  </div>
);

export default VariableNode;
