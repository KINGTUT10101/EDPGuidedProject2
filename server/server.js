import {SERVER_PORT, app} from "./initServer.js"
import "./routes/films.js"
import "./routes/characters.js"
import "./routes/starships.js"
import "./routes/planets.js"

app.all("/", async (req, res) => {
    res.status(501).send(`${req.originalUrl} is not supported`);
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`)
})