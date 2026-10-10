import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user, token } = useSelector((state) => state.auth);

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
  | NOT ADMIN
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

export default AdminRoute;
