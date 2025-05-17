import React from 'react';
import { Handle } from 'reactflow';

const FunctionNode = ({ data, selected }) => {
  return (
    <div
      style={{
        padding: 10,
        border: selected ? '2px solid #007bff' : '1px solid #ccc',
        borderRadius: 8,
        background: '#f9f9f9',
        position: 'relative',
      }}
    >
      <Handle type="target" position="left" id={`input-${data.label}`} isConnectable={true} />
      🔧 {data.label}
      <br />
      ⮡ In: {data.input?.join(', ') || ''}
      <br />
      ⮡ Out: {data.output?.join(', ') || ''}
      <Handle type="source" position="right" id={`output-${data.label}`} isConnectable={true} />
    </div>
  );
};

export default FunctionNode;
