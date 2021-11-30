import express from "express";
import listEndpoints from "express-list-endpoints";
import postsRouter from "./services/posts/post.js"

const server = express()

const port = 3001

server.use(express.json())


server.use("/posts", postsRouter)
server.listen(port, () => {})