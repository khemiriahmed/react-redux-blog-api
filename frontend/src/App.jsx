import { useEffect } from "react";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";

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
    <>
      <Navbar />

      <AppRoutes />
    </>
  );
}

export default App;
