import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CharactersPage = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [films, setFilms] = useState([]);
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        // Fetch character details
        fetch(`http://localhost:9009/api/characters/${id}`)
            .then(res => res.json())
            .then(data => {
                setCharacter(data);
                // Fetch the planet using the homeworld id
                if (data.homeworld) {
                    fetch(`http://localhost:9009/api/planets/${data.homeworld}`)
                        .then(res => res.json())
                        .then(planetData => {
                            setPlanet(planetData);
                        })
                        .catch(err => {
                            setPlanet(null);
                        });
                } else {
                    setPlanet(null);
                }
            });

        // Fetch character's films
        fetch(`http://localhost:9009/api/characters/${id}/films`)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched films:', data); 
                setFilms(data);
            })
            .catch(err => {
                setFilms([]);
                console.error('Error fetching films:', err);
            });
    }, [id]);

    if (!character) return <div>Loading...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/" className="btn btn-secondary mb-3">Back to Home</Link>
            <h2>{character.name}</h2>
            <p><b>Gender:</b> {character.gender}</p>
            <p><b>Mass:</b> {character.mass}</p>
            <p><b>Date of birth:</b> {character.birth_year}</p>
            <p><b>Home planet:</b> {planet ? (
              <Link to={`/planets/${character.homeworld}`}>{planet.name}</Link>
            ) : "Unknown"}</p>
            <p><b>Films appeared in:</b></p>
            <ul>
              {films.length === 0 && <li>No films found.</li>}
              {films.map(film => (
                <li key={film.details.id}>
                  <a href={`/films/${film.details.id}`}>{film.details.title}</a>
                </li>
              ))}
            </ul>
        </div>
    );
};
export default CharactersPage;