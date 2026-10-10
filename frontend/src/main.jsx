import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import App from "./App";
import "./index.css";
import { store } from "./app/store";

config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

);
