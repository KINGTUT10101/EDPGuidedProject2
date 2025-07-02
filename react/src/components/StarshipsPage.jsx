import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import convertToNameCase from "../helpers/convertToNameCase.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL

const StarshipsPage = () => {
  const { id } = useParams()
  const [starshipData, setStarshipData] = useState()
  const [pilotData, setPilotData] = useState()

  async function getStarshipInformation(id) {
    let starship;
    let pilots;

    try {
      starship = await fetchStarshipFromAPI(id)
      pilots = await fetchStarshipPilotsFromAPI(id)

      setStarshipData (starship)
      setPilotData (pilots)
    }
    catch (ex) {
      console.error(`Error reading starship ${id} data.`, ex.message);
    }

  }
  async function fetchStarshipFromAPI(id) {
    let starshipUrl = `${baseUrl}/starships/${id}`;
    return await fetch(starshipUrl)
      .then(res => res.json())
  }

  async function fetchStarshipPilotsFromAPI(id) {
    let pilotsUrl = `${baseUrl}/starships/${id}/characters`;
    return await fetch(pilotsUrl)
      .then(res => res.json())
  }

  // Fetch starship data
  useEffect(() => {
    try {
      getStarshipInformation (id)
    }
    catch (err) {
      console.error(`Error reading starship ${id} data.`, err.message);
    }
  }, [id]);

  if (!starshipData) return <div>Loading...</div>

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" className="btn btn-secondary mb-3">Back to Home</Link>
      <h1 id="title">{starshipData?.title}</h1>
      <section id="generalInfo">
        <p>Class: <span id="starshipClass">{starshipData?.starship_class}</span></p>
        <p>MGLT: <span id="mglt">{starshipData?.MGLT}</span></p>
        <p>Hyperdrive Rating: <span id="hyperdriveRating">{starshipData?.hyperdrive_rating}</span></p>
      </section>
      <section id="pilots">
        <h2>Pilots</h2>
        <ul>
          {
            pilotData.length > 0 &&
            pilotData?.map(character => <li key={character.id}><a href={`/characters/${character.id}`}>{character.name}</a></li>)
            ||
            <img 
              alt="Star wars meme"
              src="https://i.kym-cdn.com/entries/icons/original/000/023/967/obiwan.jpg"
              style={{
                maxWidth: "100%"
              }}
            />
          }
        </ul>
      </section>
    </div>
  )
};
export default StarshipsPage;