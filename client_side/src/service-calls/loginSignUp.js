const URL = process.env.REACT_APP_BASE_URL;

const login = async (requestBody) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

const signUp = async (requestBody) => {
  const response = await fetch(`${URL}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `${requestBody}`,
  });

  return response;
};

export { login, signUp };
