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

const updateTodoTitle = async (requestBody) => {
  const response = await fetch(`${URL}/updateTodoTitle`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

const updateTodoChecked = async (requestBody) => {
  const response = await fetch(`${URL}/updateTodoChecked`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

export { deleteTodo, updateTodoTitle, updateTodoChecked };
