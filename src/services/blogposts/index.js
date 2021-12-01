import fs from 'fs'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from "uniqid"

const blogpostsRouter = express.Router()

const getPosts = join(dirname(fileURLToPath(
    import.meta.url)), "postsDB.json")

// read post
const getUser = () => { JSON.parse(fs.readFileSync(getPosts)) }

// write post

const writeUser = content => fs.writeFileSync(getPosts, JSON.stringify(content))

// get
blogpostsRouter.get("/", (req, res, next) => {
    console.log("this is the array")
})

// get + id
blogpostsRouter.get("/:id", (req, res, next) => {
    console.log("this is the array")
})


// post
blogpostsRouter.post("/", (req, res, next) => {
    console.log("this is the array")
})



// put

blogpostsRouter.put("/:id", (req, res, next) => {
    console.log("this is the array")
})


// delete
blogpostsRouter.delete("/:id", (req, res, next) => {
    console.log("this is the array")
})





export default blogpostsRouter