import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/homepage';
import PredictionPage from './components/predictpage';
import NextTaskPage from './components/nexttaskpage';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/nexttask" element={<NextTaskPage />} />
       
        
      </Routes>
       <Analytics/>
      <SpeedInsights/>
    </Router>
  );
}

export default App;
