import TodoListContainer from "./components/TodoListContainer";
import { useSelector } from "react-redux";
import CreateTodoModal from "./components/CreateTodoModal";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const showModal = useSelector((state) => state.showModal.showModal);
  const [allTodos, setAllTodos] = useState([]);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-black text-white min-w-screen min-h-screen  relative overflow-x-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoListContainer
                allTodos={allTodos}
                setAllTodos={setAllTodos}
              />
            </PrivateRoute>
          }
        />
      </Routes>

      {showModal && <CreateTodoModal setAllTodos={setAllTodos} />}
    </div>
  );
}

export default App;
