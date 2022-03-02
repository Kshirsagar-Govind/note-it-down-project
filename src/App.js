import {
  BrowserRouter as Router,
} from "react-router-dom";

import React from 'react';
import Dashboard from "./Components/Dashboard/dashboard-main";

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
