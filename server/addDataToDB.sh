# NOTE: To use this script, you should first clone the SWAPI repo, move this script into the repo, and then run the script

mongoimport --uri mongodb://localhost:27017/swapi --collection films --drop --file ./json-data/films.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection characters --drop --file ./json-data/characters.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection planets --drop --file ./json-data/planets.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection species --drop --file ./json-data/species.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection starships --drop --file ./json-data/starships.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection transports --drop --file ./json-data/transports.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection vehicles --drop --file ./json-data/vehicles.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection films_characters --drop --file ./json-data/films_characters.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection films_planets --drop --file ./json-data/films_planets.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection films_species --drop --file ./json-data/films_species.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection films_starships --drop --file ./json-data/films_starships.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection films_vehicles --drop --file ./json-data/films_vehicles.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection species_characters --drop --file ./json-data/species_characters.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection starships_characters --drop --file ./json-data/starships_characters.json --jsonArray
mongoimport --uri mongodb://localhost:27017/swapi --collection vehicles_characters --drop --file ./json-data/vehicles_characters.json --jsonArray