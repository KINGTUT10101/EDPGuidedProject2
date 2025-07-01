import { getCollection, getItemById, getJoinedCollection } from "../mongoOps.js"
import { app } from "../initServer.js"

console.log ("Film routes initialized")

app.get("/api/films/:id/characters", async (req, res) => {
    getJoinedCollection (req, res, "film_id", "character_id", "characters", "films_characters")

})
app.get("/api/films/:id/starships", async (req, res) => {
    getJoinedCollection (req, res, "film_id", "starship_id", "starships", "films_starships")
})

app.get("/api/films/:id/planets", async (req, res) => {
    getJoinedCollection (req, res, "film_id", "planet_id", "planets", "films_planets")
})

app.get("/api/films/:id", async (req, res) => {
    getItemById (req, res, "films")
})

app.get("/api/films", async (req, res) => {
    getCollection (req, res, "films")
})