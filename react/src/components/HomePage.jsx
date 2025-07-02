import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const url = 'http://localhost:9001/api/characters';
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCharacters(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h1>Star Wars Universe Lookup</h1>
            <h2>Which character are you looking for?</h2>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search"
                    placeholder="Name here" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <hr />
            <div className="card-container" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {characters.map(character =>
                    <Link
                        to={`/characters/${character.id}`}
                        className="btn btn-primary"
                        key={character.id}
                        style={{ margin: "5px" }}>
                        {character.name}
                    </Link>
                )}
            </div>
        </>
    );
};
export default HomePage;