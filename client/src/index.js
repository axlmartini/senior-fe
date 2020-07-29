import React from "react";
import ReactDOM from "react-dom";
import './sass/styles.scss';

import App from "./js/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
