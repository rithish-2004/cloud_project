import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Homepage from './Homepage/HomePage';
import Login from './Authentication/Login';
import Register from './Authentication/Resgister';
import Outerpage from './Homepage/Outerpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outerpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
