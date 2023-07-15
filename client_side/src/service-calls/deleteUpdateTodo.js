const URL = process.env.REACT_APP_BASE_URL;

const deleteTodo = async (requestBody) => {
  const response = await fetch(`${URL}/deleteTodo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

const updateTodo = async (requestBody) => {
  const response = await fetch(`${URL}/updateTodoTitle`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

export { deleteTodo, updateTodo };
