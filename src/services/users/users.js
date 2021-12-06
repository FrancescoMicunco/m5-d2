import express from 'express'
import { getUser, writeUser, getPost, writePost, saveAvatar } from '../../lib/functions.js'
import createHttpError from "http-errors"
import uniqid from "uniqid"
import multer from 'multer'


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
    next(error)

})

// GET METHOD specific ID
// =============================
usersRouter.get("/:id", async(req, res, next) => {
    try {
        const usersArray = await getUser()
        const user = usersArray.find(e => e.id === req.params.id)
        if (user) {
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


// PUT METHOD for AVATAR
// =============================
usersRouter.put("/:id/upLoadAvatar", multer().single("profileAvatar"), async(req, res, next) => {

    try {
        const usersArray = await getUser()
        const fileName = req.file.originalname
        const extension = pathextname(fileName)

        const findIndex = contentFileArray.findIndex(e => e.id === req.params.id)
        if (findIndex == -1) {
            res.status(404).send({
                message: `Author with ${req.params.id} is not found!`
            });
        } else {
            const changedUser = usersArray[findIndex]
            changedUser = {
                ...usersArray[findIndex],
                avatar: `http://localhost:3001/author/${req.params.id}.${extension}`,
                id: req.params.id,
                updatedAt: new Date()
            }
            await writeUser(usersArray)
            res.send(changedUser)
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })

    }
    next(error)
})

// PUT METHOD
// =============================
usersRouter.put("/:id", async(req, res, next) => {

    try {
        const usersArray = await getUser()
        const findIndex = usersArray.findIndex(e => e.id === req.params.id)
        console.log("this is the index...", findIndex)
        if (findIndex == -1) {
            createHttpError(404, "Not Founded!")
        } else {
            const userToChange = usersArray[findIndex]
            const changedUser = {
                ...userToChange,
                ...req.body,
                avatar: `https://ui-avatars.com/api/?name=${req.body.name || authors[index].name}+${req.body.surname || authors[index].surname}`,
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
        const indexDeletingUser = usersArray.filter(e => e.id !== req.params.userid)
        writePost(indexDeletingUser)
        res.status(204).send()
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
    next(error)
})

export default usersRouter