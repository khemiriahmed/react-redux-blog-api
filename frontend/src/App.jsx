import { useEffect } from "react";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

import { fetchUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

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
