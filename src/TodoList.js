import React from "react";
import Todo from "./Todo";
import PropTypes from "prop-types";

const TodoList = ({
  className = "todo-list",
  list,
  onRemoveItem,
  onUpdateItem,
  toggleDone,
  header
}) => (
  <div className={className}>
    <div className="list-header">
      <span>{header}</span>
      <span>No of items: {list.length}</span>
    </div>
    <div>
      {list.map(item => (
        <Todo
          todo={item}
          key={item.id}
          onRemove={() => onRemoveItem(item.id)}
          onUpdate={newValue => onUpdateItem(item.id, newValue)}
          toggleDone={() => toggleDone(item.id)}
        />
      ))}
    </div>
  </div>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ),
  onRemoveItem: PropTypes.func.isRequired,
  onUpdateItem: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  className: PropTypes.string,
  header: PropTypes.string.isRequired
};

export default TodoList;
