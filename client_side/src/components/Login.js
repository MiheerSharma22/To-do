import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../service-calls/loginSignUp";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle form fields' state changes
  function formChangeHandler(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  // on submission of form, make a backend call to check user credentials and if it is valid user navigate
  // to /todos route, loading and showing this user's todo after fetching from backend
  async function submitHandler(event) {
    event.preventDefault();

    const loginBody = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    const response = await login(loginBody);
    const res = await response.json();

    if (res.success) {
      localStorage.setItem("email", formData.email);
      toast.success("Logged In Successfully!");
      navigate("/todos", {
        state: {
          email: formData.email,
        },
      });
    } else if (response.status === 401) {
      toast.error("Both Fields are Required");
    } else if (response.status === 404) {
      toast.error("Email does not exist. Register First!");
    } else if (response.status === 403) {
      toast.error("Wrong email or password!");
    } else if (response.status === 500) {
      toast.error("Error Logging in. PLease Try again!");
    }
  }

  return (
    <div className="flex min-w-screen min-h-screen flex-col items-center pt-[3rem]">
      <h2 className="text-3xl md:text-5xl text-[#ff5733]">Login</h2>
      {/* form */}
      <form
        className="w-[90%] md:w-[40%] mt-[3rem] md:mt-[6rem] flex flex-col gap-[3rem]"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder="Enter your email"
          required
          name="email"
          className="w-full bg-transparent p-[0.5rem] border-b border-red-600 text-[#ff5733] placeholder:text-[#cccccc83] outline-none text-xl"
          onChange={formChangeHandler}
          autoComplete="off"
        />

        {/* password container */}
        <div className="flex border-b border-red-600 items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            name="password"
            className="w-full bg-transparent p-[0.5rem] text-[#ff5733] placeholder:text-[#cccccc83] outline-none text-xl"
            onChange={formChangeHandler}
          />
          {showPassword ? (
            <button type="button" onClick={() => setShowPassword(false)}>
              <AiOutlineEyeInvisible className="text-red-600 text-2xl mr-[0.5rem]" />
            </button>
          ) : (
            <button type="button" onClick={() => setShowPassword(true)}>
              <AiOutlineEye className="text-red-600 text-2xl mr-[0.5rem]" />
            </button>
          )}
        </div>
        {/* submit button */}
        <input
          type="submit"
          value={"Login"}
          className="w-fit cursor-pointer place-self-center mt-[2rem] py-[0.7rem] px-[2rem] bg-gradient-to-r from-[#bd2525] to-[#d22727] text-white text-xl hover:text-[#bd2525] hover:outline-1 hover:outline hover:outline-offset-2 hover:outline-[#bd2525] hover:bg-gradient-to-r hover:from-transparent transition-all duration-200"
        />
      </form>

      <NavLink to="/signup" className="mt-[5rem]">
        <p className="text-lg text-[#ccc] hover:text-[#f9bd4e] transition-all duration-150">
          Not registered yet? Sign up
        </p>
      </NavLink>
    </div>
  );
};

export default Login;
