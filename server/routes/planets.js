import {URL, DBNAME, SERVER_PORT, app} from "../initServer.js"

console.log ("Planets routes initialized")

app.get("/api/planets/:id/characters", async (req, res) => {
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

app.get("/api/planets/:id/films", async (req, res) => {
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

app.get("/api/planets/:id", async (req, res) => {
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