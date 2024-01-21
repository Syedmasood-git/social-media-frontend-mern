import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { AiFillHeart } from "react-icons/ai";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
      <div className="credits">
        <h2>
          Made with <AiFillHeart style={{ color: "red" }} className="icon" /> By
          Syed Masood
        </h2>
      </div>
    </Provider>
  </HashRouter>
);
