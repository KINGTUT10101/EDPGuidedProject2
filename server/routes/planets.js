import { getCollection, getItemById, getJoinedCollection } from "../mongoOps.js"
import { app } from "../initServer.js"

console.log ("Planets routes initialized")

app.get("/api/planets/:id/characters", async (req, res) => {
    getJoinedCollection (req, res, "homeworld", "id", "characters", "characters")
})

app.get("/api/planets/:id/films", async (req, res) => {
    getJoinedCollection (req, res, "planet_id", "film_id", "films", "films_planets")
})

app.get("/api/planets/:id", async (req, res) => {
    getItemById (req, res, "planets")
})