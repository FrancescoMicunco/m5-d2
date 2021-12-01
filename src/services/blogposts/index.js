import fs from 'fs'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from "uniqid"
import createHttpError from "http-errors"

const blogpostsRouter = express.Router()

const getPosts = join(dirname(fileURLToPath(
    import.meta.url)), "postsDB.json")
console.log(getPosts)

// read post
const getPost = () => JSON.parse(fs.readFileSync(getPosts))

// write post

const writePost = content => fs.writeFileSync(getPosts, JSON.stringify(content))

// get
blogpostsRouter.get("/", (req, res, next) => {
    try {
        const postsPath = getPost()
        res.send(postsPath)
    } catch (error) {
        next(createHttpError(400, 'Bad Request!'))
    }
})


// post
blogpostsRouter.post("/", (req, res, next) => {
    try {
        const postsPath = getPost()
        console.log(req.body)
        const newPost = {
            "_id": uniqid(),
            ...req.body,
            "createdAt": new Date()
        }
        postsPath.push(newPost)
        writePost(postsPath)
        res.status(201).send({
            id: newPost._id
        })

    } catch (error) {
        next(createHttpError(401, 'Unauthorized!'))
    }
})


// get + id
blogpostsRouter.get("/:id", (req, res, next) => {
    try {
        const postsPath = getPost()
        console.log(postsPath)
        const post = postsPath.find(p => p._id === req.params.id)
        console.log(post)
        if (post) {
            res.send(post)
        } else {
            res.send("")
        }

    } catch (error) {
        next(createHttpError(404, 'Not Found!'))
    }
})



// put

blogpostsRouter.put("/:id", (req, res, next) => {
    try {
        const postsPath = getPost()
        const findIndex = postsPath.findIndex(e => e._id === req.params.id)
        console.log(findIndex)
        postsPath[findIndex] = {
            ...postsPath[findIndex],
            ...req.body,
            updatedAt: new Date()
        }
        writePost(postsPath)
        res.send(postsPath[findIndex])

    } catch (error) {
        next(createHttpError(400, 'Bad Request!'))
    }
})

// delete
blogpostsRouter.delete("/:id", (req, res, next) => {
    try {
        const postsPath = getPost()
        const indexDeletingPost = postsPath.filter(e => e._id !== req.params.id)
        writePost(indexDeletingPost)
        res.status(204).send()
    } catch (error) {

    }

    next(createHttpError(400, 'Bad Request!'))
})


export default blogpostsRouter