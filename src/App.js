import {
  BrowserRouter as Router,
} from "react-router-dom";

import React from 'react';
import Dashboard from "./Components/Dashboard/dashboard-main";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

function App() {

  return (
    <div className="App">
      <ToastContainer
        style={{ fontSize: '16px' }}


      />
      <Router>
        <Dashboard />
      </Router>
    </div>
  );
}



export default App;
