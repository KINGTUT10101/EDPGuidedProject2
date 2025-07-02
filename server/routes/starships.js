import { getCollection, getItemById, getJoinedCollection } from "../mongoOps.js"
import { app } from "../initServer.js"

console.log ("Starships routes initialized")

app.get("/api/starships/:id/characters", async (req, res) => {
    getJoinedCollection (req, res, "starship_id", "character_id", "characters", "starships_characters")
})

app.get("/api/starships/:id", async (req, res) => {
    getItemById (req, res, "starships")
})

app.get("/api/starships", async (req, res) => {
    getCollection (req, res, "starships")
})