import {
  BrowserRouter as Router, Route, Routes,
  useLocation
} from "react-router-dom";

import React from 'react';



import Dashboard from "./Components/Dashboard/dashboard-wrapper";


function App() {

  return (
    <div className="App">
      <Router>
        <Dashboard />
      </Router>

    </div>
  );
}

export default App;
