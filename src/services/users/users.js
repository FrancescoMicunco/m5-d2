import fs from 'fs'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from "uniqid"

const usersRouter = express.Router()


//  access db file
const userPath = join(dirname(fileURLToPath(
    import.meta.url)), "usersDb.json")

// get user
const getUser = () => { JSON.parse(fs.readFileSync(userPath)) }

// write user

const writeUser = content => fs.writeFileSync(userPath, JSON.stringify(content))


// GET METHOD
// =============================

usersRouter.get("/", (req, res, next) => {
    try {
        const usersArray = getUser()
        res.send(usersArray)
    } catch (error) {
        console.log("there is an error")
    }

})

// GET METHOD specific ID
// =============================
usersRouter.get("/:userid", (req, res, next) => {
    try {
        const usersArray = getUser()
        const user = usersArray.find(e => e.id === req.params.userid)
        if (user) {
            res.send(user)
        } else {
            console.log("user doesn't exist")
        }

    } catch (error) {
        console.log("there is an error")
    }
})


// POST METHOD
// =============================
usersRouter.post("/", (req, res, next) => {
    const usersArray = getUser()
    try {
        const { name, surname, email, date_of_birt } = req.body;
        const newUser = {
            id: uniqid(),
            name,
            surname,
            email,
            date_of_birt,
            createdAt: new Date(),
            updatedAt: new Date(),
            avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`
        }
        console.log(newUser)
        usersArray.push(newUser)
        writeUser(usersArray)
        res.status(201).send({
            id: newUser.id
        })
    } catch (error) {

    }
})


// PUT METHOD
// =============================
usersRouter.put("/:userid", (req, res, next) => {
    const usersArray = getUser()
    try {
        const findIndex = contentFileArray.findIndex(e => e.id === req.params.userid)
        const userToModify = usersArray[findIndex]
        const userUpdated = req.body
        const updateUser = {
            ...userToModify,
            ...userUpdated
        }
        usersArray[index] = updateUser
        writeUser(usersArray)
        res.send(updateUser)
    } catch (error) {
        console.log("there is an error")

    }

})


// DELETE METHOD
// =============================
usersRouter.delete("/:userid", (req, res, next) => {
    try {
        const usersArray = getUser()
        usersArray.filter(e => e.id !== req.params.userid)
        res.status(204).send()
    } catch (error) {
        console.log("there is an error")
    }


})

export default usersRouter