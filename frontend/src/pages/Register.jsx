import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  registerUser,
} from "../features/auth/authSlice";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | REDUX STATE
  |--------------------------------------------------------------------------
  */
  const { loading, error } =
    useSelector(
      (state) => state.auth
    );

  /*
  |--------------------------------------------------------------------------
  | FORM STATE
  |--------------------------------------------------------------------------
  */
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction =
      await dispatch(
        registerUser(formData)
      );

    if (
      registerUser.fulfilled.match(
        resultAction
      )
    ) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Register
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 font-semibold"
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-center">
              Registration failed
            </p>
          )}

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account ?

          <Link
            to="/login"
            className="text-blue-600 ml-2 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;