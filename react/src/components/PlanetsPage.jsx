import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PlanetsPage = () => {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        // Fetch planet details
        fetch(`http://localhost:9009/api/planets/${id}`)
            .then(res => res.json())
            .then(data => setPlanet(data));

        // Fetch characters from this planet using the correct endpoint
        fetch(`http://localhost:9009/api/planets/${id}/characters`)
            .then(res => res.json())
            .then(data => setCharacters(data));

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
                    <li key={char.details.id}>
                        <p>{char.details.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlanetsPage;