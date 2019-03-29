import React from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import ActionHistoryList from "./ActionHisoryList";
import useTodoList from "./useTodoList";
import listReducer from "./todoReducer"; // reducer for todo-list
import { withHook } from "./utils";
import "./App.scss";

window.__DEV__ = false;

const todoList = [
  { id: 1, title: "drink coffee", completed: false },
  { id: 2, title: "write code", completed: false },
  { id: 3, title: "eat food", completed: false },
  { id: 4, title: "sleep", completed: false }
];

function TodoApp({
  hooked: {
    list,
    actionHistory,
    addItem,
    updateItemValue,
    toggleDone,
    removeItem,
    replay,
    stop,
    playing
  }
}) {
  // a custom hook
  return (
    <div id="todo-app">
      <TodoList
        header="Done Items"
        list={list.filter(({ completed }) => completed)}
        onRemoveItem={removeItem}
        onUpdateItem={updateItemValue}
        toggleDone={toggleDone}
      />
      <TodoList
        header="Todo List"
        list={list.filter(({ completed }) => !completed)}
        onRemoveItem={removeItem}
        onUpdateItem={updateItemValue}
        toggleDone={toggleDone}
      />
      <AddTodo onAdd={addItem} />
      <ActionHistoryList
        list={actionHistory}
        onPlay={replay}
        onStop={stop}
        playing={playing}
      />
    </div>
  );
}

TodoApp = withHook(TodoApp, () => {
  return useTodoList(listReducer, todoList);
});

export default TodoApp;
