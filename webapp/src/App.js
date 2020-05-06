import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";
import './App.css';

import Sensor from './Component/Sensor';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <h1>Sensor Details</h1>

            <Sensor/>
        </div>
      </BrowserRouter>
  );
}

export default App;
