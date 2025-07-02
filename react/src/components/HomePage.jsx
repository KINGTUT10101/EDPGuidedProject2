import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const url = 'http://localhost:9009/api/characters'
    const [characters, setCharacters] = useState([])
    let [fullCharacters, setFullCharacters] = useState(characters)

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCharacters(data)
                setFullCharacters (data)
            })
            .catch(err => console.error(err));
    }, []);

    function handleSubmit(event) {
        event.preventDefault()

        const searchStr = event.currentTarget.elements.searchStr.value

        const re = new RegExp(searchStr, "i")
        setCharacters(characters.filter(character => {
            return re.test(character.name)
        }))
    }

    function handleInputChange(event) {
        if (event.target.value === '') {
            setCharacters (fullCharacters)
        }
    }

    return (
        <>
            <h1>Star Wars Universe Lookup</h1>
            <h2>Which character are you looking for?</h2>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search"
                    placeholder="Name here" aria-label="Search" id="searchStr" onChange={handleInputChange} />
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