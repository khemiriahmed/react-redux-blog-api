import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logoutUser,
} from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token, user } = useSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */
  const handleLogout = async () => {
    await dispatch(logoutUser());

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          MyBlog
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* NOT LOGGED */}
          {!token && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

          {/* LOGGED USER */}
          {token && user && (
            <div className="relative">

              {/* BUTTON */}
              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
              >

                {/* AVATAR */}
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0)}
                </div>

                {/* NAME */}
                <div className="text-left">
                  <p className="text-sm font-semibold">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>

              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl overflow-hidden border">

                  <Link
                    to="/"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() =>
                      setOpen(false)
                    }
                  >
                    Home
                  </Link>

                  <Link
                    to="/create-article"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() =>
                      setOpen(false)
                    }
                  >
                    Create Article
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;