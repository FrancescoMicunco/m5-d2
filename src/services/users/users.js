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
import { basicAuthMiddleware } from '../../auth/basic.js'
import UserModel from './schema'



const usersRouter = express.Router()



// GET METHOD
// =============================

usersRouter.get("/", basicAuthMiddleware, async(req, res, next) => {
    try {
        const users = await UserModel.find()

        // getUser()
        res.send(users)
    } catch (error) {
        res.send(500).send({
            message: error.message
        })
    }
    next()

})

// ========== /me ================

usersRouter.get("/me", basicAuthMiddleware, async(req, res, next) => { res.send(req.user) })

usersRouter.delete("/me", basicAuthMiddleware, async(req, res, next) => {
    try {
        await req.user.deleteOne()
    } catch (error) {
        next(error)
    }
})


// GET METHOD specific ID
// =============================
usersRouter.get("/:id", basicAuthMiddleware, async(req, res, next) => {
    try {
        const usersArray = await UserModel.findById(req.params.id)
        if (user) {
            res.send(user)
        } else {
            next(createHttpError(404, 'User not found'))
        }
        // getUser()
        // const user = usersArray.find(e => e._id === req.params.id)

        // if (user) {
        //     console.log("user to get", user)
        //     res.send(user)
        // } else {
        //     next(createHttpError(404, 'Not found!'))
        // }
    } catch (error) {
        res.send(500).send({
            message: error.message
        })
    }
    next(error)
})

// POST METHOD
// =============================
usersRouter.post("/", basicAuthMiddleware, async(req, res, next) => {
    try {
        const usersArray = new UserModel(req.body)
        const { id } = await user.save()

        // getUser()

        // const newUser = {
        //     "_id": uniqid(),
        //     ...req.body,
        //     avatar: req.body.avatar,
        //     "createdAt": new Date(),
        //     "updatedAt": new Date(),
        // }
        // usersArray.push(newUser)
        // await writeUser(usersArray)
        res.status(201).send({ _id }
            // newUser
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
usersRouter.put("/:id", basicAuthMiddleware, async(req, res, next) => {

    try {
        const usersArray = await UserModel.findByIdAndUpdate(req.params.id)
            // getUser()
            // const findIndex = usersArray.findIndex(e => e._id === req.params.id)
            // console.log("this is the index...", findIndex)
            // if (findIndex == -1) {
            //     createHttpError(404, "Not Founded!")

        if (usersArray) {
            res.send(usersArray)

        } else {
            // const userToChange = usersArray[findIndex]
            // const changedUser = {
            //     ...userToChange,
            //     ...req.body,
            //     avatar: `https://ui-avatars.com/api/?name=${req.body.name || usersArray[index].name}+${req.body.surname || users[index].surname}`,
            //     updatedAt: new Date()
            // }
            // await writeUser(usersArray)
            // res.send("User updated!")
            next(createHttpError(404, 'User not found'))
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
usersRouter.delete("/:userid", basicAuthMiddleware, async(req, res, next) => {
    try {
        const usersArray = await UserModel.findByIdAndDelete(req.params.id)
            // getUser()
        const indexDeletingUser = usersArray.filter(e => e._id !== req.params.userid)
        if (usersArray)


        // writePost(indexDeletingUser)
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