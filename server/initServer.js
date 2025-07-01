import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
const URL = process.env.MONGO_DB_URL
const DBNAME = process.env.MONGO_DB

const app = express()
const SERVER_PORT = process.env.SERVER_PORT

app.use(cors())
app.use(express.json())

console.log ("Server objects initialized")

export {URL, DBNAME, SERVER_PORT, app}