import { MongoClient, ObjectId } from 'mongodb';
import {URL, DBNAME, SERVER_PORT, app} from "./initServer.js"

export async function getCollection (req, res, collectionName) {
    try {
        const client = await MongoClient.connect(URL)
        const db = client.db(DBNAME)
        const collection = db.collection(collectionName)
        const data = await collection.find({}).toArray()

        if (data.length > 0)
            res.status(200).json(data)
        else
            res.status(404).send("No data found.")
    }
    catch (err) {
        console.error("Error: ", err)
        res.status(500)
    }
}

export async function getItemById (req, res, collectionName) {
    try {
        const { id } = req.params

        const client = await MongoClient.connect(URL)
        const db = client.db(DBNAME)
        const collection = db.collection(collectionName)
        const data = await collection.findOne({ id: Number(id) })

        if (data)
            res.status(200).json(data)
        else
            res.status(404).send("No data found.")
    }
    catch (err) {
        console.error("Error: ", err)
        res.status(500);
    }
}

export async function getJoinedCollection (req, res, idFrom, idTo, collectionNameTo, junctionCollectionName) {
    try {
        const { id } = req.params

        const client = await MongoClient.connect(URL)
        const db = client.db(DBNAME)
        const collection = db.collection(junctionCollectionName)
        const data = await collection.aggregate([
            {$match: {[idFrom]: Number(id)}},
            {
                $lookup: {
                    from: collectionNameTo,
                    localField: idTo,
                    foreignField: "id",
                    as: "details"
                }
            },
            {$unwind: "$details"},
            {$project: {_id: 0, details: 1}},
            { $replaceRoot: { newRoot: "$details" } }
        ]).toArray ()

        if (data.length > 0)
            res.status(200).json(data)
        else
            res.status(404).send("No data found.")
    }
    catch (err) {
        console.error("Error: ", err)
        res.status(500);
    }
}