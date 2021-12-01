import express from "express";
import listEndpoints from "express-list-endpoints";
import usersRouter from "./services/users/users.js"
import blogpostsRouter from "./services/blogposts/index.js"
import cors from "cors"


const server = express()

const port = 3001

server.use(express.json())
server.use(cors())
server.use("/users", usersRouter)
server.use("/posts", blogpostsRouter)

console.table(listEndpoints(server))

server.listen(port, () => {})