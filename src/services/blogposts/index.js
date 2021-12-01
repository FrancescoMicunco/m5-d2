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
        next(error)
    }

})

// get + id
blogpostsRouter.get("/:id", (req, res, next) => {
    try {
        const postsPath = getPost()
        const post = postsPath.find(p => p.id === req.params.id)
        if (post) {
            res.send(post)
        } else {
            res.send("")
        }

    } catch (error) {
        next(error)
    }
})


// post
blogpostsRouter.post("/", (req, res, next) => {
    try {
        const postsPath = getPost()
        const newPost = {
            "_id": uniqid(),
            "category": "req.body.category",
            "title": "req.body.title",
            "cover": "req.body.cover",
            "readTime": {
                "value": 2,
                "unit": "minute"
            },
            "author": {
                "name": "req.body.user.name",
                "avatar": "req.body.user.avatar"
            },
            "content": "HTML",
            "createdAt": new Date()
        }
        postsPath.push(newPost)
        writePost(postsPath)
        res.status(201).send({ id: newPost._id }

        )

    } catch (error) {
        next(error)
    }
})

// put

blogpostsRouter.put("/:id", (req, res, next) => {
    try {
        const postsPath = getPost()
        const findIndex = postsPath.findIndex(e => e.id === req.params.userid)
        const postToModify = postsPath[findIndex]
        const postUpdated = req.body
        const updatePost = {
            ...postToModify,
            ...postUpdated
        }
        postsPath[index] = updatePost
        writePost(postsPath)
        res.send(updatePost)

    } catch (error) {
        next(error)
    }
})

// delete
blogpostsRouter.delete("/:id", (req, res, next) => {
    try {
        const postsPath = getPost()
        postsPath.filter(e => e.id !== req.params.userid)
        res.status(204).send()
    } catch (error) {

    }

    next(error)
})


export default blogpostsRouter