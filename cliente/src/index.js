import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import './index.css';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <React.StrictMode>
<App />
</React.StrictMode>
</Provider>
);
reportWebVitals();

