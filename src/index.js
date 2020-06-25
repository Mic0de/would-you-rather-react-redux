import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "primereact/resources/themes/luna-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./css/index.css";
import App from "./components/App";
import reducer from "./reducers";
import middleware from "./middleware";
import {BrowserRouter as Router} from 'react-router-dom';

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
