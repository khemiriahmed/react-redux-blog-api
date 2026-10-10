import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { registerUser } from "../features/auth/authSlice";

import { useNavigate, Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | REDUX STATE
  |--------------------------------------------------------------------------
  */
  const { loading, error } = useSelector((state) => state.auth);

  /*
  |--------------------------------------------------------------------------
  | FORM STATE
  |--------------------------------------------------------------------------
  */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "Registration failed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* BRAND */}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-3xl text-white shadow-lg shadow-blue-900/40 mb-4">
            <FontAwesomeIcon icon={faBlog} />
          </div>

          <h1 className="text-3xl font-bold text-white">MyBlog</h1>

          <p className="text-slate-400 mt-2">Create your account</p>
        </div>

        {/* CARD */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 space-y-1">
                {!error.errors && <p>{errorMessage}</p>}

                {Object.entries(error.errors || {}).map(
                  ([field, messages]) => (
                    <p key={field}>{messages[0]}</p>
                  ),
                )}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition duration-300 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}

              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* LOGIN LINK */}

          <p className="text-center text-gray-500 mt-6">
            Already have an account ?
            <Link
              to="/login"
              className="text-blue-600 font-medium ml-2 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
