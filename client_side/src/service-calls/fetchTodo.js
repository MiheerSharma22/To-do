const URL = process.env.REACT_APP_BASE_URL;

const fetchTodo = async (email) => {
  const response = await fetch(`${URL}/getAllTodos?email=${email}`, {
    method: "GET",
  });
  return response;
};

export default fetchTodo;
