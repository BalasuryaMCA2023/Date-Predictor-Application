import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/homepage';
import PredictionPage from './components/predictpage';
import NextTaskPage from './components/nexttaskpage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/nexttask" element={<NextTaskPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;