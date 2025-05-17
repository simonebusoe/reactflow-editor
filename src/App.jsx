import React, { useState, useCallback, useEffect } from 'react';
import { ReactFlowProvider, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

import VariableNode from '../components/nodes/VariableNode';
import FunctionNode from '../components/nodes/FunctionNode';
import SidePanel from '../components/SidePanel';
import TaskTabs from '../components/TaskTabs';
import Toolbar from '../components/Toolbar';
import FlowEditor from '../components/FlowEditor';
import SettingsMenu from '../components/SettingsMenu';

const nodeTypes = {
  variable: VariableNode,
  function: FunctionNode,
};

let taskIdCounter = 1;
let nodeIdCounter = 100;
const STORAGE_KEY = 'flow-editor-layout';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [sidePanelNode, setSidePanelNode] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setTasks(parsed);
      setActiveTaskId(parsed[0]?.id || null);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  const setActiveFlow = (type, changes) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== activeTaskId) return t;
        return {
          ...t,
          flow: {
            ...t.flow,
            [type]: type === 'nodes'
              ? applyNodeChanges(changes, t.flow.nodes)
              : applyEdgeChanges(changes, t.flow.edges),
          },
        };
      })
    );
  };

  const addTask = () => {
    const newId = `task-${taskIdCounter++}`;
    const newTask = {
      id: newId,
      name: `Task ${taskIdCounter}`,
      metadata: { type: 'Computation', frequency: 60 },
      flow: { nodes: [], edges: [] },
    };
    setTasks((prev) => [...prev, newTask]);
    setActiveTaskId(newId);
  };

  const deleteTask = () => {
    if (tasks.length === 1) return;
    setTasks((prev) => prev.filter((t) => t.id !== activeTaskId));
    const next = tasks.find((t) => t.id !== activeTaskId);
    if (next) setActiveTaskId(next.id);
  };

  const updateTaskName = (id, name) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));
  };

  const addNode = (type) => {
    const newNode = {
      id: `node-${nodeIdCounter++}`,
      type,
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      data: type === 'variable'
        ? { label: `var_${nodeIdCounter}`, varType: 'F32' }
        : { label: `func_${nodeIdCounter}`, input: [], output: [] },
    };
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId
          ? { ...t, flow: { ...t.flow, nodes: [...t.flow.nodes, newNode] } }
          : t
      )
    );
  };

  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId
          ? {
              ...t,
              flow: {
                ...t.flow,
                nodes: t.flow.nodes.filter((n) => n.id !== selectedNodeId),
                edges: t.flow.edges.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId),
              },
            }
          : t
      )
    );
    setSelectedNodeId(null);
  };

  const updateNodeData = (id, newData) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId
          ? {
              ...t,
              flow: {
                ...t.flow,
                nodes: t.flow.nodes.map((n) =>
                  n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
                ),
              },
            }
          : t
      )
    );
  };

  const exportToJson = () => {
    const output = {
      Environment: {
        Tasks: tasks.map((t) => ({
          Name: t.name,
          Type: t.metadata.type,
          Frequency: t.metadata.frequency,
          Variables: t.flow.nodes
            .filter((n) => n.type === 'variable')
            .map((v) => ({ Name: v.data.label, Type: v.data.varType || 'Unknown' })),
          Functions: t.flow.nodes
            .filter((n) => n.type === 'function')
            .map((f) => ({
              Name: f.data.label,
              Type: 'Unknown',
              Input: f.data.input || [],
              Output: f.data.output || [],
            })),
        })),
      },
    };
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'edited-tasks.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const importFromFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const parsedTasks = json.Environment.Tasks.map((task, i) => ({
          id: `task-${i}`,
          name: task.Name,
          metadata: { type: task.Type, frequency: task.Frequency },
          flow: {
            nodes: [
              ...(task.Variables || []).map((v, vi) => ({
                id: `var-${i}-${vi}`,
                type: 'variable',
                position: { x: 100, y: 100 + vi * 100 },
                data: { label: v.Name, varType: v.Type },
              })),
              ...(task.Functions || []).map((f, fi) => ({
                id: `func-${i}-${fi}`,
                type: 'function',
                position: { x: 300, y: 100 + fi * 100 },
                data: {
                  label: f.Name,
                  input: f.Input || [],
                  output: f.Output || [],
                },
              })),
            ],
            edges: [],
          },
        }));
        setTasks(parsedTasks);
        setActiveTaskId(parsedTasks[0]?.id || null);
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const onSelectionChange = useCallback(({ nodes }) => {
    setSelectedNodeId(nodes[0]?.id || null);
  }, []);

  const onNodeDoubleClick = (_, node) => {
    setSidePanelNode(node);
  };

  const setTaskEdges = (newEdges) => {
  setTasks((prev) =>
    prev.map((t) =>
      t.id === activeTaskId
        ? { ...t, flow: { ...t.flow, edges: typeof newEdges === 'function' ? newEdges(t.flow.edges) : newEdges } }
        : t
      )
    );
  };


  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TaskTabs
              tasks={tasks}
              activeTaskId={activeTaskId}
              onSetActive={setActiveTaskId}
              onAdd={addTask}
              onRename={updateTaskName}
              onDelete={deleteTask}
            />
            <SettingsMenu onSave={exportToJson} onLoad={importFromFile} />
          </div>

          <Toolbar
            onAddVariable={() => addNode('variable')}
            onAddFunction={() => addNode('function')}
            onDeleteSelected={deleteSelectedNode}
            disableDelete={!selectedNodeId}
          />

          <FlowEditor
            nodes={activeTask?.flow.nodes || []}
            edges={activeTask?.flow.edges || []}
            onNodesChange={(changes) => setActiveFlow('nodes', changes)}
            onEdgesChange={(changes) => setActiveFlow('edges', changes)}
            setEdges={setTaskEdges}
            onSelectionChange={onSelectionChange}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
          />

          <SidePanel
            node={sidePanelNode}
            onClose={() => setSidePanelNode(null)}
            onUpdate={updateNodeData}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
