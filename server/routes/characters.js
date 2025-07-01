import { getCollection, getItemById, getJoinedCollection } from "../mongoOps.js"
import { app } from "../initServer.js"

console.log ("Characters routes initialized")

app.get("/api/characters/:id/films", async (req, res) => {
    getJoinedCollection (req, res, "character_id", "film_id", "films", "films_characters")
})

app.get("/api/characters/:id", async (req, res) => {
    getItemById (req, res, "characters")
})

app.get("/api/characters", async (req, res) => {
    getCollection (req, res, "characters")
})