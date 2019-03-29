import React, { useState } from "react";
import { withHook } from "./utils";

const myHook = props => {
  let [val, setVal] = useState("");
  return [val, setVal];
};

let AddTodo = ({ onAdd, hooked: [newItem, setItem] }) => {
  return (
    <div id="add-todo">
      <div className="header">Add a todo</div>
      <textarea onChange={e => setItem(e.target.value)} value={newItem} />
      <div>
        <button
          onClick={() => {
            if (newItem) {
              onAdd(newItem);
              setItem("");
            } else {
              alert("Write something to add!");
            }
          }}
        >
          Add Item
        </button>
        <button onClick={() => setItem("")}>Reset</button>
      </div>
    </div>
  );
};
AddTodo = withHook(AddTodo, myHook);
export default AddTodo;
