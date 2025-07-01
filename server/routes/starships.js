import {URL, DBNAME, SERVER_PORT, app} from "../initServer.js"

console.log ("Starships routes initialized")

app.get("/api/starships/:id/characters", async (req, res) => {
    try {
        const { color } = req.body

        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        const socks = await collection.find({ "sockDetails.color": color }).toArray()

        if (socks.length > 0)
            res.status(200).json(socks)
        else
            res.status(404).send("No socks found with that color.")
    }
    catch (err) {
        console.error("Error: ", err)
        res.status(500).send("Hmmm, something smells... No socks for you! ☹\n");
    }
})

app.get("/api/starships/:id", async (req, res) => {
    try {
        const { color } = req.body

        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        const socks = await collection.find({ "sockDetails.color": color }).toArray()

        if (socks.length > 0)
            res.status(200).json(socks)
        else
            res.status(404).send("No socks found with that color.")
    }
    catch (err) {
        console.error("Error: ", err)
        res.status(500).send("Hmmm, something smells... No socks for you! ☹\n");
    }
})

app.get("/api/starships", async (req, res) => {
    try {
        const { color } = req.body

        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        const socks = await collection.find({ "sockDetails.color": color }).toArray()

        if (socks.length > 0)
            res.status(200).json(socks)
        else
            res.status(404).send("No socks found with that color.")
    }
    catch (err) {
        console.error("Error: ", err)
        res.status(500).send("Hmmm, something smells... No socks for you! ☹\n");
    }
})