import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signUp } from "../service-calls/loginSignUp";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import BtnSpinner from "./BtnSpinner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const { fName, lName, email, password } = formData;

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
  // to /todos route, loading and showing this user's todo after fetching from backend, since signing up, no todos intially
  async function submitHandler(event) {
    event.preventDefault();

    setShowSpinner(true);

    const signupBody = JSON.stringify({
      fName,
      lName,
      email,
      password,
    });

    const response = await signUp(signupBody);
    const res = await response.json();
    console.log("signup response:", res);

    if (res.success) {
      localStorage.setItem("email", email);
      toast.success("User registered successfully");
      navigate("/todos", {
        state: {
          email: email,
        },
      });
    } else if (response.status === 400) {
      toast.error("All Fields Required");
    } else if (response.status === 406) {
      toast.error("Email already in use");
    } else if (response.status === 500) {
      toast.error("Error in registration. Try again later!");
    }

    setShowSpinner(false);
  }

  return (
    <div>
      <div className="flex min-w-screen min-h-screen flex-col items-center pt-[3rem]">
        <h2 className="text-3xl md:text-5xl text-[#ff5733]">Sign Up</h2>
        {/* form */}
        <form
          className="w-[90%] md:w-[40%] mt-[3rem] md:mt-[6rem] flex flex-col gap-[3rem]"
          onSubmit={submitHandler}
        >
          {/* fname and lname container */}
          <div className="w-full flex flex-col md:flex-row gap-[3rem] md:gap-5">
            <input
              type="text"
              placeholder="First Name"
              name="fName"
              required
              className="w-full bg-transparent p-[0.5rem] border-b border-red-600 text-[#ff5733] placeholder:text-[#cccccc83] outline-none text-xl"
              onChange={formChangeHandler}
              autoComplete="off"
              value={fName}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lName"
              required
              className="w-full bg-transparent p-[0.5rem] border-b border-red-600 text-[#ff5733] placeholder:text-[#cccccc83] outline-none text-xl"
              onChange={formChangeHandler}
              autoComplete="off"
              value={lName}
            />
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            className="w-full bg-transparent p-[0.5rem] border-b border-red-600 text-[#ff5733] placeholder:text-[#cccccc83] outline-none text-xl"
            onChange={formChangeHandler}
            autoComplete="off"
            value={email}
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
              autoComplete="off"
              value={password}
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
          <button
            type="submit"
            className="w-fit cursor-pointer place-self-center mt-[2rem] py-[0.7rem] px-[2rem] bg-gradient-to-r from-[#bd2525] to-[#d22727] text-white text-xl hover:text-[#bd2525] hover:outline-1 hover:outline hover:outline-offset-2 hover:outline-[#bd2525] hover:bg-gradient-to-r hover:from-transparent transition-all duration-200"
          >
            {showSpinner ? <BtnSpinner /> : "Sign Up"}
          </button>
        </form>

        <NavLink to="/login" className="mt-[2rem]">
          <p className="text-lg text-[#ccc] hover:text-[#f9bd4e] transition-all duration-150">
            Registered user? Log In
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
