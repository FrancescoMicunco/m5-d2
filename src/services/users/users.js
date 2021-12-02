import express from 'express'
import fs from 'fs'
import {
    getUser,
    writeUser,
    parseImage,
    upload
} from '../../lib/functions.js'
import {
    fileURLToPath
} from "url";
import {
    dirname,
    join
} from "path";
import createHttpError from "http-errors"
import { postValidation } from '../../lib/validation.js '
import { validationResult } from 'express-validator'
import uniqid from "uniqid"
import multer from 'multer'
import { saveAvatar } from '../../lib/functions.js'


const usersRouter = express.Router()




// GET METHOD
// =============================

usersRouter.get("/", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        console.log("this is usersArray path", usersArray)
        res.send(usersArray)
    } catch (error) {
        res.send(500).send({
            message: error.message
        })
    }
    next(error)

})

// GET METHOD specific ID
// =============================
usersRouter.get("/:id", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        console.log(usersArray)
        const user = usersArray.find(e => e._id === req.params.id)
        if (user) {
            res.send(user)
        } else {
            next(createHttpError(404, 'Not found!'))
        }

    } catch (error) {

    }
    next(error)
})


// POST METHOD
// =============================
usersRouter.post("/", async(req, res, next) => {
    try {
        const usersArray = await getUser()

        const newUser = {
            "_id": uniqid(),
            ...req.body,
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }
        usersArray.push(newUser)
        writeUser(usersArray)
        res.status(201).send(
            newUser
        )

    } catch (error) {
        res.send(500).send({
            message: error.message
        })
    }
    next(error)
})


// PUT METHOD for AVATAR
// =============================
usersRouter.put("/:id/upLoadAvatar", parseImage.single("profileAvatar"), upload, async(req, res, next) => {

    try {
        const usersArray = await getUser()
        const findIndex = contentFileArray.findIndex(e => e.id === req.params.id)
        if (findIndex == -1) {
            res.status(404).send({
                message: `Author with ${req.params.id} is not found!`
            });
        } else {
            const changedUser = usersArray[findIndex]
            changedUser = {
                ...usersArray[findIndex],
                avatar: req.file,
                id: req.params.id,
                updatedAt: new Date()
            }
            writeUser(usersArray)
            res.send(changedUser)
        }
    } catch (error) {}
    next(error)
})

// PUT METHOD
// =============================
usersRouter.put("/:id", async(req, res, next) => {
    const usersArray = await getUser()
    try {
        const findIndex = contentFileArray.findIndex(e => e.id === req.params.id)
        if (findIndex == -1) {
            res.status(404)
        } else {
            usersArray[findIndex] = {
                ...usersArray[findIndex],
                ...req.body,
                updatedAt: new Date()
            }
            writeUser(usersArray)
            res.send(updateUser[findIndex])
        }
    } catch (error) {

    }
    next(error)
})


// DELETE METHOD
// =============================
usersRouter.delete("/:userid", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        const indexDeletingUser = usersArray.filter(e => e.id !== req.params.userid)
        writePost(indexDeletingUser)
        res.status(204).send()
    } catch (error) {
        console.log("there is an error")
    }
    next(error)
})

export default usersRouter