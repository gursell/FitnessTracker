
import mongoose from "mongoose"
import express from "express"
import apiRegister from "./apiRegister.js"

const server = express()

const port = 3002

server.use(express.json())

mongoose.connect("mongodb+srv://unlgrsel:gursel1234@cluster0.hl9pkld.mongodb.net/");

apiRegister(server, mongoose)


server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))