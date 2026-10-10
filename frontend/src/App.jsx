import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

import { fetchUser } from "./features/auth/authSlice";

const AUTH_PATHS = ["/login", "/register"];

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  /*
  |--------------------------------------------------------------------------
  | LOAD USER ON REFRESH (SANCTUM)
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | AUTH PAGES -> CLEAN FULLSCREEN LAYOUT (NO SIDEBAR / NAVBAR)
  |--------------------------------------------------------------------------
  */
  if (AUTH_PATHS.includes(pathname)) {
    return <AppRoutes />;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-72">
        <Navbar />

        <div className="p-6">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
