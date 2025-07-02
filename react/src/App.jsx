import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage.jsx';
import FilmsPage from './components/FilmsPage.jsx';
import PlanetsPage from './components/PlanetsPage.jsx';
import CharactersPage from './components/CharactersPage.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters/:id" element={<CharactersPage />} />
      </Routes>
    </Router>
  );
}

export default App
