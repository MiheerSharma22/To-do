const URL = process.env.REACT_APP_BASE_URL;

const addTodo = async (requestBody) => {
  const response = await fetch(`${URL}/addTodo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

export default addTodo;
