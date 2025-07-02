import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const HomePage = () => {
    const url = 'http://localhost:9001/api/characters';
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [characterFilms, setCharacterFilms] = useState([]);
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCharacters(data))
            .catch(err => console.error(err));
    }, []);
    //Open the modal and set the selected character
    const handleShowModal = (character) => {
        setSelectedCharacter(character);
        setShowModal(true);
        fetchFilms(character.id);
        fetchPlanet(character.homeworld)
    };
    //Close the model and clear the selected character
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCharacter(null);
        setCharacterFilms([]);
    };

    //Function to return all films character appeared in
    const fetchFilms = (id) => {
        let url = `http://localhost:9001/api/characters/${id}/films`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCharacterFilms(data))
            .catch(err => {
                setCharacterFilms([]);
                console.error(err);
            });
    };

    //Function to return the homeplanet of the character
    const fetchPlanet = (id) =>{
        let planetUrl = `http://localhost:9001/api/planets/`;
        fetch(planetUrl)
            .then(res => res.json())
            .then(planetsArray => {
                //finding the planet with the matching id
                const foundPlanet = planetsArray.find(planet => planet.id === id);
                setPlanet(foundPlanet || null);
            })
          //  .then(data => console.log(data))
    };

    return(
        <>
           <h1> Star Wars Universe Lookup</h1>
           <h2> Which character are you looking for?</h2> 
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search"
                    placeholder="Name here" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <hr></hr>
            <button onClick={fetchPlanet(1)}> Testing fetch planet </button>
            <div className="card-container" style ={{display: "flex", flexWrap: "wrap", class: "col-sm-6", gap: "20px" }}>
                {
                    characters.map(character => 
                        <button className="btn btn-primary" key={character.id} onClick={() => handleShowModal(character)}> {character.name} </button>
                    )
                }
            </div>
            
            {showModal && selectedCharacter ? (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className = "modal-dialog" role="document">
                        <div className = "modal-content">
                            <div className ="modal-header">
                                <h5 className = "modal-title">{selectedCharacter.name}</h5>
                                <button type="button" class="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Height: {selectedCharacter.gender}</p>
                                <p>Mass: {selectedCharacter.mass}</p>
                                <p>Date of birth: {selectedCharacter.birth_year}</p>
                                <p><b>Home planet: </b> {planet ? planet.name : "Unknown"} </p>
                                <p><b>Films appeared in: </b></p>
                                <ul>
                                    {
                                        characterFilms.map(film => ((
                                            <li key={film.id}><a href={`/films/${film.id}`} >{film.title} </a></li>
                                        )))
                                    }
                                </ul>

                            </div>
                            <div class="modal-footer">
                                <button type="button" className ="bnt btn-secondary" onClick={handleCloseModal}> Close </button>
                            </div>
                        </div>
                    </div>
                </div>

            ): null}
        </>
    );
};
export default HomePage;