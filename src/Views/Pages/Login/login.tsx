import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../../Controllers/Redux/authSlice";

const Login = (): JSX.Element => {
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({ name: "", password: "" });

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setFormInput((prevState) => ({ ...prevState, ...newState }));
  };

  const submitForm = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(signIn(formInput));
  };
  return (
    <div className="w-full flex justify-center">
      <form className="bg-white flex flex-col p-10 rounded-2xl max-w-md ">
        <h1>Login:</h1>
        <input
          name="name"
          placeholder="Name"
          onChange={inputChangeHandler}
          value={formInput.name}
        ></input>
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={inputChangeHandler}
          value={formInput.password}
        ></input>
        <button
          type="submit"
          onClick={submitForm}
          className="bg-purple-600 rounded-md text-white"
        >
          Login
        </button>
        <button className="text-white bg-red-600 rounded-md">
          Login With Google
        </button>
        <button className="border border-purple-600 rounded-md text-purple-600">
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Login;
