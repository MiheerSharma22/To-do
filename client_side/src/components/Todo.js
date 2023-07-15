import React from "react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import { deleteTodo, updateTodo } from "../service-calls/deleteUpdateTodo";

const Todo = (props) => {
  const [todoTitle, setTodoTitle] = useState(props.title);
  const [update, setUpdate] = useState(false);
  const [checked, setChecked] = useState(false);

  // update button handler
  function handleUpdate(event) {
    if (event.key === "Enter") {
      // make a backend call to update title in DB
      const updatedTitle = todoTitle;
      const todoId = event.target.parentNode.children[0].id;
      const updateTodoRequest = JSON.stringify({
        updatedTitle,
        todoId,
      });
      updateTodo(updateTodoRequest);

      // set update to false to display label with updated title on Ui again
      setUpdate(false);
      return;
    } else setTodoTitle(event.target.value);
  }

  // delete button handler
  function handleDelete(event) {
    const todoId =
      event.target.parentNode.parentNode.children[0].children[0].id;
    const deleteTodoRequest = JSON.stringify({ todoId });
    deleteTodo(deleteTodoRequest);

    // remove this item from todo Container
    event.target.parentNode.parentNode.parentNode.removeChild(
      event.target.parentNode.parentNode
    );
  }

  return (
    <div className="flex py-[1rem] px-[1.5rem] rounded-[10px] items-center justify-between">
      {/* checkbox and todo title container */}
      <div className="flex items-center gap-[1rem] cursor-pointer p-0">
        <input
          type="checkbox"
          id={props.id}
          className=""
          onChange={() => setChecked(!checked)}
        />
        {!update ? (
          <label
            htmlFor={props.id}
            className={`text-[1.2rem] cursor-pointer ${
              checked ? "setLineThrough text-[#ccc]" : ""
            }`}
          >
            {todoTitle}
          </label>
        ) : (
          <input
            type="text"
            defaultValue={todoTitle}
            onKeyUp={handleUpdate}
            autoFocus={true}
            className="text-[1.2rem] border px-[0.5rem] bg-transparent outline-none"
          />
        )}
      </div>

      {/* delete and update button container */}
      <div className="flex gap-[0.75rem]">
        {/* delete button */}
        <button
          className="bg-red-500 rounded-full p-[0.5rem] group hover:bg-[#f7f6f6] transition-all duration-150"
          onClick={handleDelete}
        >
          <MdDeleteForever className="text-[1.25rem] group-hover:text-red-500 transition-all duration-150 pointer-events-none" />
        </button>

        {/* update button */}
        <button
          className="bg-green-500 rounded-full p-[0.5rem] group hover:bg-[#f7f6f6] transition-all duration-150"
          onClick={() => setUpdate(true)}
        >
          <BsPencilFill className="text-[1.25rem] group-hover:text-green-500 transition-all duration-150 pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
