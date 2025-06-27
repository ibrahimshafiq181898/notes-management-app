import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NoteProvider } from "./context/NoteContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NoteProvider>
        <Router>
          <App />
        </Router>
      </NoteProvider>
    </Provider>
  </React.StrictMode>
);
