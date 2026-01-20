import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KordleGame from './games/KordleGame';
import MathSurvival from './games/MathSurvival';

const App = () => {
  return (
    <Router>
      <div className="app-main-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kordle" element={<KordleGame />} />
          <Route path="/math" element={<MathSurvival />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
