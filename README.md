
# 🧠 ReactFlow JSON Task Editor

This project is a visual JSON-based task configuration editor using [React Flow](https://reactflow.dev). It lets you:

✅ Create and manage multiple tasks (as tabs)  
✅ Visually lay out functions and variables as nodes  
✅ Connect variables to functions via input/output handles  
✅ Edit all properties via a side panel  
✅ Import/export a structured JSON file for backend use  
✅ Persist layout with localStorage  
✅ Modular component structure for maintainability

---

## 💡 Core Features

- **Tabbed Task Editor**: Each tab is a task with its own flow
- **Node Types**:
  - `Function`: with inputs and outputs
  - `Variable`: with type dropdown
- **Connectable Graph**: Only `output ➝ input` connections allowed
- **Side Panel Editor**: Double-click nodes to edit properties
- **JSON Load/Save**: From a gear menu (⚙️), handles file input and download
- **Auto Save**: Uses `localStorage` to persist state across reloads

---

## 🧱 Project Structure

src/
├── App.jsx # Main logic, routes components
├── components/
│ ├── FlowEditor.jsx # ReactFlow canvas with connection logic
│ ├── TaskTabs.jsx # Tab bar for switching and renaming tasks
│ ├── Toolbar.jsx # Variable/function creation controls
│ ├── SettingsMenu.jsx # Gear ⚙️ menu for import/export
│ ├── SidePanel.jsx # Editor for node properties
│ └── nodes/
│ ├── VariableNode.jsx
│ └── FunctionNode.jsx
├── utils/ # (optional) JSON helpers, constants


---

## 📦 JSON Schema (compatible with backend)

Example export structure:

```json
{
  "Environment": {
    "Tasks": [
      {
        "Name": "Task 1",
        "Type": "Computation",
        "Frequency": 50,
        "Variables": [{ "Name": "a", "Type": "F32" }],
        "Functions": [
          {
            "Name": "Sum1",
            "Type": "Sum",
            "Input": ["a", "b"],
            "Output": ["c"]
          }
        ]
      }
    ]
  }
}

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


