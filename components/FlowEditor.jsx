import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const FlowEditor = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setEdges,
  onSelectionChange,
  onNodeDoubleClick,
  nodeTypes,
}) => {
  const handleConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const isValidConnection = ({ sourceHandle, targetHandle }) =>
    sourceHandle === 'output' && targetHandle === 'input';

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={handleConnect}
      onSelectionChange={onSelectionChange}
      onNodeDoubleClick={onNodeDoubleClick}
      nodeTypes={nodeTypes}
      isValidConnection={isValidConnection}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default FlowEditor;
