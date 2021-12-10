import express from 'express'
import { getUser, writeUser, getPost, writePost } from '../../lib/functions.js'
import createHttpError from "http-errors"
import uniqid from "uniqid"
import {
    CloudinaryStorage
} from 'multer-storage-cloudinary'
import {
    v2 as cloudinary
} from 'cloudinary'
import multer from 'multer'
import { sendRegistrationEmail } from '../../lib/email.js'
import {
    upload,
    uploadFile
} from '../../lib/upload.js'


const usersRouter = express.Router()



// GET METHOD
// =============================

usersRouter.get("/", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        res.send(usersArray)
    } catch (error) {
        res.send(500).send({
            message: error.message
        })
    }
    next()

})

// GET METHOD specific ID
// =============================
usersRouter.get("/:id", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        const user = usersArray.find(e => e._id === req.params.id)

        if (user) {
            console.log("user to get", user)
            res.send(user)
        } else {
            next(createHttpError(404, 'Not found!'))
        }
    } catch (error) {
        res.send(500).send({
            message: error.message
        })
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
            avatar: req.body.avatar,
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }
        usersArray.push(newUser)
        await writeUser(usersArray)
        res.status(201).send(
            newUser
        )
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
    next(error)
})


// Put METHOD for AVATAR
// =============================
usersRouter.put("/:id/upLoadAvatar", upload.single('avatar'), uploadFile, async(req, res, next) => {
    try {
        const usersArray = await getUser()
        const findIndex = usersArray.findIndex(e => e._id === req.params.id)
        console.log("THIS IS THE searched user", findIndex)
        if (findIndex !== -1) {
            const searched = usersArray[findIndex]
            const changedUserAvatar = {
                ...searched,
                avatar: req.file,
                updatedAt: new Date(),
                id: req.params.id
            }
            usersArray[findIndex] = changedUser
            await writeUser(usersArray)
            res.send("Done!")
        } else {
            res.status(404).send({
                message: `Author with ${req.params.id} is not found!`
            });
        }
    } catch (error) {
        res.status(500).send("General error")
    }
    next(error)
})

// PUT METHOD
// =============================
usersRouter.put("/:id", async(req, res, next) => {

    try {
        const usersArray = await getUser()
        const findIndex = usersArray.findIndex(e => e._id === req.params.id)
        console.log("this is the index...", findIndex)
        if (findIndex == -1) {
            createHttpError(404, "Not Founded!")
        } else {
            const userToChange = usersArray[findIndex]
            const changedUser = {
                ...userToChange,
                ...req.body,
                avatar: `https://ui-avatars.com/api/?name=${req.body.name || usersArray[index].name}+${req.body.surname || users[index].surname}`,
                updatedAt: new Date()
            }
            await writeUser(usersArray)
            res.send("User updated!")
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
    next(error)
})


// DELETE METHOD
// =============================
usersRouter.delete("/:userid", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        const indexDeletingUser = usersArray.filter(e => e._id !== req.params.userid)
        writePost(indexDeletingUser)
        res.status(204).send()
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
    next(error)
})

usersRouter.post("/form", async(req, res, next) => {
    try {

        const { email } = req.body

        const usersArray = await getUser()
        const newUser = {
            "_id": uniqid(),
            ...req.body,
            "createdAt": new Date(),
            "updatedAt": new Date(),
        }
        usersArray.push(newUser)
        await writeUser(usersArray)
        await sendRegistrationEmail(email)
        res.send({ message: "done" })

    } catch (error) {
        next(error)
    }
})

export default usersRouter