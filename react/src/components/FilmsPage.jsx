import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import convertToNameCase from "../helpers/convertToNameCase.jsx"

const baseUrl = import.meta.env.VITE_BASE_URL

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchStarships(film) {
  const url = `${baseUrl}/films/${film?.id}/starships`;
  const starships = await fetch(url)
    .then(res => res.json())
  return starships;
}

async function fetchPlanets(film) {
  const url = `${baseUrl}/films/${film?.id}/planets`;
  const planets = await fetch(url).then(res => res.json());
  return planets;
}

const FilmsPage = () => {
  const { id } = useParams()
  const [filmData, setFilmData] = useState()

  // Fetch film data
  useEffect(() => {
    try {
      fetchFilm(id)
        .then(async (res) => {
          let film = res
          film.characters = await fetchCharacters(film)
          film.starships = await fetchStarships(film)
          film.planets = await fetchPlanets(film)
          setFilmData(film)
        })
    }
    catch (err) {
      console.error(`Error reading film ${id} data.`, err.message);
    }
  }, [id]);

  if (!filmData) return <div>Loading...</div>

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" className="btn btn-secondary mb-3">Back to Home</Link>
      <h1 id="title">{filmData?.title}</h1>
      <section id="generalInfo">
        <p>Release Date: <span id="release_date">{filmData?.release_date}</span></p>
        <p>Episode: <span id="episode">{filmData?.episode_id}</span></p>
        <p>Director: <span id="director">{filmData?.director}</span></p>
      </section>
      <section id="producers">
        <h2>Producer(s)</h2>
        <ul>
          {
            filmData?.producer?.split(",")?.map(item => item.trim())?.map(producer =>
              <li key={producer}>
                <p>
                  {producer}
                </p>
              </li>
            )
          }
        </ul>
      </section>
      <section id="characters">
        <h2>Featured Characters</h2>
        <ul>
          {
            filmData?.characters?.map(character => <li key={character.id}><a href={`/characters/${character.id}`}>{character.name}</a></li>)
          }
        </ul>
      </section>
      <section id="starships">
        <h2>Featured Starships</h2>
        <ul>
          {
            filmData?.starships?.map(starship => <li key={starship.id}><a href={`/starships/${starship.id}`}>{convertToNameCase(starship.name ?? `${starship.starship_class} (${starship.id})`)}</a></li>)
          }
        </ul>
      </section>
      <section id="planets">
        <h2>Featured Planets</h2>
        <ul>
          {
            filmData?.planets?.map(planet =>
              <li key={planet.id}><a href={`/planets/${planet.id}`}>{planet.name}</a></li>)
          }
        </ul>
      </section>
      <section id="crawl_section">
        <h2>Opening Crawl</h2>
        <p><span key="opening_crawl">{filmData?.opening_crawl}</span></p>
      </section>
    </div>
  )
};
export default FilmsPage;