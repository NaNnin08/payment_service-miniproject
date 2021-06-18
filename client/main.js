import React from "react";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./assets/styles/index.css";
import store from "./store.js";

const renderMethod = !!module.hot ? render : hydrate;

renderMethod(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
