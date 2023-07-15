const URL = process.env.REACT_APP_BASE_URL;

const fetchTodo = async () => {
  const response = await fetch(`${URL}/getAllTodos`, { method: "GET" });
  return response;
};

export default fetchTodo;
