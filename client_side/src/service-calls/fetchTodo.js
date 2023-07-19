const URL = process.env.REACT_APP_BASE_URL;
const email = localStorage.getItem("email");

const fetchTodo = async () => {
  const response = await fetch(`${URL}/getAllTodos?email=${email}`, {
    method: "GET",
  });
  return response;
};

export default fetchTodo;
