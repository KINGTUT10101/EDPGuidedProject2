import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage.jsx';
import FilmsPage from './components/FilmsPage.jsx';
import PlanetsPage from './components/PlanetsPage.jsx';
import CharactersPage from './components/CharactersPage.jsx';
import StarshipsPage from './components/StarshipsPage.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters/:id" element={<CharactersPage />} />
        <Route path="/planets/:id" element={<PlanetsPage />} />
        <Route path="/films/:id" element={<FilmsPage />} />
        <Route path="/starships/:id" element={<StarshipsPage />} />
      </Routes>
    </Router>
  );
}

export default App
