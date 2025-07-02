import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const PlanetsPage = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        // Fetch planet details
        fetch(`${BASE_URL}/planets/${id}`)
            .then(res => res.json())
            .then(data => setPlanet(data));

        // Fetch characters from this planet using the correct endpoint
        fetch(`${BASE_URL}/planets/${id}/characters`)
            .then(res => res.json())
            .then(data => setCharacters(data));

        //Fetch films from this planet
        fetch(`${BASE_URL}/planets/${id}/films`)
            .then(res => res.json())
            .then(data =>setFilms(data));

    }, [id]);

    if (!planet) return <div>Loading...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Planet</h1>
            <Link to="/" className="btn btn-secondary mb-3">Back to Home</Link>
            <h2>{planet.name}</h2>
            <p><b>Climate:</b> {planet.climate}</p>
            <p><b>Terrain:</b> {planet.terrain}</p>
            <p><b>Population:</b> {planet.population}</p>
            <hr />
            <h4>Characters from {planet.name}:</h4>
            <ul>
              {characters.length === 0 && <li>No characters found.</li>}
              {characters.map(char => (
                <li key={char.id}>
                  <p>{char.name}</p>
                  <Link to={`/characters/${char.id}`}>character page</Link>
                </li>
              ))}
            </ul>

            <h4>Films from this planet</h4>
            <ul>
                {films.length === 0 && <li>No films found.</li>}
                {films.map(film => (
                    <li key={film.id}>
                        <p>{film.title}</p> 
                        <Link to={`/films/${film.id}`}> films link </Link>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default PlanetsPage;