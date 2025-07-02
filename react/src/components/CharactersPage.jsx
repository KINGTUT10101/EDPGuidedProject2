import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CharactersPage = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [films, setFilms] = useState([]);
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        // Fetch character details
        fetch(`http://localhost:9001/api/characters/${id}`)
            .then(res => res.json())
            .then(data => {
                setCharacter(data);
                // Fetch planet
                fetch('http://localhost:9001/api/planets')
                    .then(res => res.json())
                    .then(planetsArray => {
                        const foundPlanet = planetsArray.find(p => p.id === data.homeworld);
                        setPlanet(foundPlanet || null);
                    });
            });

        // Fetch films
        fetch(`http://localhost:9001/api/characters/${id}/films`)
            .then(res => res.json())
            .then(data => setFilms(data));
    }, [id]);

    if (!character) return <div>Loading...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/" className="btn btn-secondary mb-3">Back to Home</Link>
            <h2>{character.name}</h2>
            <p><b>Gender:</b> {character.gender}</p>
            <p><b>Mass:</b> {character.mass}</p>
            <p><b>Date of birth:</b> {character.birth_year}</p>
            <p><b>Home planet:</b> {planet ? planet.name : "Unknown"}</p>
            <p><b>Films appeared in:</b></p>
            <ul>
                {films.length === 0 && <li>No films found.</li>}
                {films.map(film => (
                    <li key={film.id}>
                        <a href={`/films/${film.id}`}>{film.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default CharactersPage;