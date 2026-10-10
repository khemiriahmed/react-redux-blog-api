import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, token } = useSelector(
    (state) => state.auth
  );

  /*
  |--------------------------------------------------------------------------
  | NOT LOGGED IN
  |--------------------------------------------------------------------------
  */
  if (!token) {
    return <Navigate to="/login" />;
  }

  /*
  |--------------------------------------------------------------------------
  | USER STILL LOADING (FETCH /me)
  |--------------------------------------------------------------------------
  */
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;