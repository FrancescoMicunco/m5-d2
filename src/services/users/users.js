import express from 'express'
import { getUser, writeUser } from '../../lib/functions.js'
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
        res.send(usersArray)
    } catch (error) {
        next(error)
    }

})

// GET METHOD specific ID
// =============================
usersRouter.get("/:userid", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        console.log(usersArray)
        const user = usersArray.find(e => e._id === req.params.userid)
        if (user) {
            res.send(user)
        } else {
            next(createHttpError(404, 'Not found!'))
        }

    } catch (error) {
        next(error)
    }
})


// POST METHOD
// =============================
usersRouter.post("/", postValidation, async(req, res, next) => {
    const usersArray = getUser()
    try {
        const errorsList = validationResult(req)
        if (!errorsList.isEmpty()) {
            next(createHttpError(400, 'Bad Request!'))
        } else {

            const newUser = {
                "_id": uniqid(),
                ...req.body,
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }
            usersArray.push(newUser)
            writeUser(usersArray)
            res.status(201).send({
                id: newUser.id
            })
        }
    } catch (error) {

    }
})

// POST METHOD for AVATAR
// =============================
usersRouter.post("/:id/upLoadAvatar", multer().single("profileAvatar"), async(req, res, next) => {
    try {
        await saveAvatar(req.file.originalname, req.file.buffer)
        res.status(201).send("OK")
    } catch (error) {

    }
    next(error)
})

// PUT METHOD
// =============================
usersRouter.put("/:userid", async(req, res, next) => {
    const usersArray = await getUser()
    try {
        const findIndex = contentFileArray.findIndex(e => e.id === req.params.userid)
        usersArray[findIndex] = {
            ...usersArray[findIndex],
            ...req.body,
            updatedAt: new Date()
        }
        writeUser(usersArray)
        res.send(updateUser[findIndex])
    } catch (error) {
        next(error)
    }
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