import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { hideModal } from "../redux/slices/ShowModal";
import addTodo from "../service-calls/addTodo";

const CreateTodoModal = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  async function handleAddTodo(event) {
    const createTodoRequest = JSON.stringify({
      title: title,
      todoId: 1,
    });

    const response = await addTodo(createTodoRequest);
    const data = await response.json();

    console.log("Add todo response: ", data);

    dispatch(hideModal());
  }

  return createPortal(
    <div
      className="top-0 left-0 right-0 bottom-0 bg-[#00000088] absolute flex felx-col justify-center items-center min-w-screen min-h-screen"
      onClick={() => dispatch(hideModal())}
    >
      {/* modal container */}
      <div
        className="bg-[#fff] w-[50%] h-fit flex flex-col rounded-lg modal-container relative py-[3rem] px-[1.5rem]"
        onClick={(event) => event.stopPropagation()}
      >
        <label
          htmlFor="newTodoInput"
          className="text-[1.2rem] cursor-pointer mb-[0.5rem]"
        >
          Enter the Item to be added to the List
        </label>
        <input
          type="text"
          id="newTodoInput"
          autoFocus={true}
          className="p-[0.5rem] text-[1.5rem] outline-none border border-black rounded-sm"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />

        {/* add todo button */}
        <button
          type="button"
          className="w-fit bg-red-600 text-white py-[0.7rem] px-[2rem] mt-[1.5rem] rounded-full text-[1.2rem] hover:bg-transparent hover:outline outline-1 outline-red-600 hover:text-red-600 transition-all duration-200"
          onClick={handleAddTodo}
        >
          Add To-Do
        </button>

        {/* close modal button */}
        <button
          className="border-2 border-[#FF5733]  w-[2rem] rounded-[50%] flex items-center justify-center aspect-[1/1] absolute text-[#FF5733] top-[10px] right-[10px] font-bold hover:rotate-[360deg] hover:bg-[#FF5733] hover:text-white transition-all duration-150"
          onClick={() => dispatch(hideModal())}
        >
          X
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CreateTodoModal;
