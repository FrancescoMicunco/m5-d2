import express from 'express'
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { postValidation } from '../../lib/validation.js'
import { validationResult } from 'express-validator'
import { getPost, writePost } from '../../lib/functions.js'

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


// blogpostsRouter.post("/", postValidation, async(req, res, next) => {
//     try {
//         const errorsList = validationResult(req)
//         if (!errorsList.isEmpty()) {
//             next(createHttpError(400, 'Bad Request!'))
//         } else {
//             const postsPath = await getPost()

//             const newPost = {
//                 "_id": uniqid(),
//                 ...req.body,
//                 "createdAt": new Date()
//             }
//             postsPath.push(newPost)
//             writePost(postsPath)
//             res.status(201).send({
//                 id: newPost._id
//             })
//         }
//     } catch (error) {
//         next(error)
//     }
// })

// =================  GET + ID ==============
// ==========================================


// blogpostsRouter.get("/:id", async(req, res, next) => {
//     try {
//         const postsPath = await getPost()
//         console.log(postsPath)
//         const post = postsPath.find(p => p._id === req.params.id)
//         console.log(post)
//         if (post) {
//             res.send(post)
//         } else {
//             next(createHttpError(404, 'Not found!'))
//         }

//     } catch (error) {
//         next(error)
//     }
// })

// =================  PUT ==============
// =====================================
// blogpostsRouter.put("/:id", async(req, res, next) => {
//     try {
//         const postsPath = await getPost()
//         const findIndex = postsPath.findIndex(e => e._id === req.params.id)
//         console.log(findIndex)
//         postsPath[findIndex] = {
//             ...postsPath[findIndex],
//             ...req.body,
//             updatedAt: new Date()
//         }
//         writePost(postsPath)
//         res.send(postsPath[findIndex])

//     } catch (error) {
//         next(error)
//     }
// })

// =================  DELETE ==============
// =====================================

// blogpostsRouter.delete("/:id", async(req, res, next) => {
//     try {
//         const postsPath = await getPost()
//         const indexDeletingPost = postsPath.filter(e => e._id !== req.params.id)
//         writePost(indexDeletingPost)
//         res.status(204).send()
//     } catch (error) {

//     }

//     next(error)
// })


export default blogpostsRouter