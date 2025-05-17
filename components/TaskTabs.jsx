import React from 'react';

const TaskTabs = ({ tasks, activeTaskId, onSetActive, onAdd, onRename, onDelete }) => {
  const [editingId, setEditingId] = React.useState(null);

  return (
    <div style={{ display: 'flex', padding: '8px 10px', background: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onSetActive(task.id)}
            onDoubleClick={() => setEditingId(task.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              backgroundColor: task.id === activeTaskId ? '#007bff' : '#e0e0e0',
              color: task.id === activeTaskId ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: task.id === activeTaskId ? 'bold' : 'normal',
            }}
          >
            {editingId === task.id ? (
              <input
                type="text"
                defaultValue={task.name}
                autoFocus
                onBlur={(e) => {
                  onRename(task.id, e.target.value);
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onRename(task.id, e.target.value);
                    setEditingId(null);
                  }
                }}
                style={{ border: 'none', outline: 'none' }}
              />
            ) : (
              task.name
            )}
          </div>
        ))}
        <div
          onClick={onAdd}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            backgroundColor: '#fff',
            border: '1px dashed #ccc',
            color: '#555',
            cursor: 'pointer',
          }}
        >
          ➕ Add Task
        </div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
        <button onClick={onDelete} disabled={tasks.length <= 1} style={{
          padding: '6px 12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}>🗑️ Delete Task</button>
      </div>
    </div>
  );
};

export default TaskTabs;
