import React, { useState } from "react";
import PropTypes from "prop-types";
import { withHook } from "./utils";

const useTodo = ({ onUpdate }) => {
  let [isEditing, setEditing] = useState(false);
  const editTodo = () => setEditing(true);
  const viewTodo = () => setEditing(false);
  const updateValue = newValue => {
    viewTodo();
    onUpdate(newValue);
  };
  return {
    isEditing,
    editTodo,
    viewTodo,
    updateValue
  };
};

let Todo = ({
  className,
  todo,
  onRemove,
  toggleDone,
  hooked: { isEditing, editTodo, viewTodo, updateValue }
}) => {
  return (
    <div className={className}>
      <span>{todo.id})</span>
      {isEditing ? (
        <EditTodo
          initialTodo={todo.title}
          onSave={updateValue}
          onCancel={viewTodo}
        />
      ) : (
        <ViewTodo
          todo={todo.title}
          done={todo.completed}
          toggleDone={toggleDone}
          onEdit={editTodo}
          onRemove={onRemove}
        />
      )}
    </div>
  );
};

Todo.defaultProps = {
  className: "todo-row"
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

Todo = withHook(Todo, useTodo);

const ViewTodo = ({ todo, onEdit, onRemove, done, toggleDone }) => (
  <>
    <span className={`todo ${done ? "done" : ""}`}>{todo}</span>
    <button onClick={toggleDone}>{done ? "Undone" : "Done"}</button>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onRemove}>Remove</button>
  </>
);

ViewTodo.propTypes = {
  todo: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

let EditTodo = ({ onSave, onCancel, hooked: { todo, setTodo } }) => {
  return (
    <>
      <textarea value={todo} onChange={e => setTodo(e.target.value)} />
      <button onClick={() => onSave(todo)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  );
};

EditTodo.propTypes = {
  initialTodo: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

EditTodo = withHook(EditTodo, ({ initialTodo }) => {
  let [todo, setTodo] = useState(initialTodo);
  return { todo, setTodo };
});

export default Todo;
