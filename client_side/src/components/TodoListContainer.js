import React from "react";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import Spinner from "./Spinner";
import fetchTodo from "../service-calls/fetchTodo";

const TodoListContainer = ({ allTodos, setAllTodos }) => {
  const [loading, setLoading] = useState(false);

  async function init() {
    // setting loading to true
    setLoading(true);

    // fetching all the todos from the Db, if there are any
    const response = await fetchTodo();

    // if we get something in response (that is if any todos are available)
    if (response.status === 200) {
      const data = await response.json();
      setAllTodos(data.data);
    }

    // setting loading to false
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const deleteTodo = (todoId) => {
    const newList = allTodos.filter((todo) => todo._id !== todoId);
    setAllTodos(newList);
  };

  return (
    <div className="w-[60%] min-h-[80vh] rounded-[2rem] bg-[#ffffff40] border border-[#ffffff59] p-[2rem] flex flex-col relative">
      <p className="heading text-center text-[2rem] mb-[0.75rem] text-[#FF5733]">
        TO-DO List !
      </p>

      {/* show loading spinner */}
      {/* load each todo fetched from the Db onto UI */}
      {loading ? (
        <Spinner />
      ) : allTodos.length > 0 ? (
        allTodos.map((todo, index) => (
          <Todo
            key={todo._id}
            id={todo._id}
            title={todo.title}
            handleDeleteTodo={deleteTodo}
            checked={todo.checked}
          />
        ))
      ) : (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] text-[2rem]">
          List Is Empty!
        </div>
      )}
    </div>
  );
};

export default TodoListContainer;
