import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Homepage from './HomePage';
import Login from './Login';
import Outerpage from './Outerpage';
import Register from './Register';
import Settings from './Settings';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Outerpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}/>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;
