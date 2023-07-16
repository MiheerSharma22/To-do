import TodoListContainer from "./components/TodoListContainer";
import { useSelector, useDispatch } from "react-redux";
import { displayModal } from "./redux/slices/ShowModal";
import CreateTodoModal from "./components/CreateTodoModal";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.showModal.showModal);

  function handleShowModal() {
    dispatch(displayModal());
  }

  return (
    // todo: delete custom id
    // todo: destructure in map
    <div className="bg-black text-white min-w-screen min-h-screen flex justify-center items-center relative py-[3rem] overflow-x-hidden">
      {/* todo list container */}
      <TodoListContainer />

      {/* add Items button */}
      <button
        className="addItems py-[0.7rem] px-[2rem] bg-gradient-to-r from-[#bd2525] to-[#d22727] text-white text-xl hover:text-[#bd2525] hover:outline-1 hover:outline hover:outline-offset-2 hover:outline-[#bd2525] hover:bg-gradient-to-r hover:from-transparent fixed top-[85%] right-[4%] transition-all duration-200"
        onClick={handleShowModal}
      >
        Add Items
      </button>

      {showModal && <CreateTodoModal />}
    </div>
  );
}

export default App;
