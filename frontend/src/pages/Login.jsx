import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../features/auth/authSlice";

import { useNavigate, Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 text-center">Invalid credentials</p>
          )}
        </form>

        <p className="text-center text-gray-500 mt-6">
          No account ?
          <Link to="/register" className="text-blue-600 ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
