import express from 'express'
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { postValidation } from '../../lib/validation.js'
import { validationResult } from 'express-validator'
import { getPost, writePost } from '../../lib/functions.js'
import { getReadble } from '../../lib/pdf.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
const blogpostsRouter = express.Router()


// =================  GET ==============
// =====================================


blogpostsRouter.get("/", async(req, res, next) => {
    try {
        const postsPath = await getPost()
        res.send(postsPath)
    } catch (error) {
        next(error)
    }
})

// =================  POST ==============
// =====================================


blogpostsRouter.post("/", async(req, res, next) => {
    try {
        const postsPath = await getPost()
        const newPost = {
            "_id": uniqid(),
            ...req.body,
            ...req.file,
            "createdAt": new Date()
        }
        postsPath.push(newPost)
        await writePost(postsPath)
        res.status(201).send({
            id: newPost._id
        })
    } catch (error) {
        next(error)
    }
})

// =================  GET + ID ==============
// ==========================================


blogpostsRouter.get("/:id", async(req, res, next) => {
    try {
        const postsPath = await getPost()
        console.log(postsPath)
        const post = postsPath.find(p => p._id === req.params.id)
        console.log(post)
        if (post) {
            res.send(post)
        } else {
            next(createHttpError(404, 'Not found!'))
        }

    } catch (error) {
        next(error)
    }
})

// =================  GET + ID + pdf ==============
// ==========================================

blogpostsRouter.get("/:id/pdf", async(req, res, next) => {
    try {
        res.setHeader(
            "Content-Disposition", "attachement; filename=newfile.pdf"
        )
        const source = getReadble()
        const destination = res
        pipeline(source, destination, err => {
            if (err) next("it's not ok")
        })
    } catch (error) {
        next("it's not ok")
    }
})

// =================  PUT ==============
// =====================================
blogpostsRouter.put("/:id", async(req, res, next) => {
    try {
        const postsPath = await getPost()
        const findIndex = postsPath.findIndex(e => e._id === req.params.id)
        console.log(findIndex)
        postsPath[findIndex] = {
            ...postsPath[findIndex],
            ...req.body,
            updatedAt: new Date()
        }
        await writePost(postsPath)
        res.send("Post updated!")

    } catch (error) {
        next(error)
    }
})

// =================  DELETE ==============
// =====================================

blogpostsRouter.delete("/:id", async(req, res, next) => {
    try {
        const postsPath = await getPost()
        const indexDeletingPost = postsPath.filter(e => e._id !== req.params.id)
        await writePost(indexDeletingPost)
        res.status(204).send()
    } catch (error) {

    }

    next(error)
})


export default blogpostsRouter