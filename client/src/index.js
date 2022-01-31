import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Context from "../src/contexts/userContext"

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Router>
        <App />
      </Router>
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);


