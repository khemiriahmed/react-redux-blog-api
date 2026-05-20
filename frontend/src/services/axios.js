import axios from "axios";

/*
|--------------------------------------------------------------------------
| AXIOS INSTANCE
|--------------------------------------------------------------------------
*/
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
*/
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR
|--------------------------------------------------------------------------
*/
api.interceptors.response.use(
  (response) => response,

  (error) => {

    /*
    |--------------------------------------------------------------------------
    | TOKEN EXPIRED / UNAUTHORIZED
    |--------------------------------------------------------------------------
    */
    if (
      error.response?.status === 401
    ) {
      localStorage.removeItem(
        "token"
      );

      window.location.href =
        "/login";
    }

    return Promise.reject(error);
  }
);

export default api;