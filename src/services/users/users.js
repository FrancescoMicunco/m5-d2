import fs from 'fs'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from "uniqid"

const usersRouter = express.Router()


// take file path
const currentUserPath = fileURLToPath(
    import.meta.url)
console.log(
    import.meta.url)

// take folder path
const currentFolderPath = dirname(currentUserPath)
console.log(currentFolderPath)
    //  access db file
const userPath = join(currentFolderPath, "usersDb.json")



// GET METHOD
// =============================

usersRouter.get("/", (req, res) => {
    const contentFile = fs.readFileSync(userPath) //array in machine language
    const contentFileArray = JSON.parse(contentFile)
    res.send(contentFileArray)
})

// GET METHOD specific ID
// =============================
usersRouter.get("/:userid", (req, res) => {
    const contentFile = fs.readFileSync(userPath) //array in machine language
    const contentFileArray = JSON.parse(contentFile)
    const user = contentFileArray.find(e => e.id === req.params.userId)
    res.send(user)
})


// POST METHOD
// =============================
usersRouter.post("/", (req, res) => {
    const contentFile = fs.readFileSync(userPath)
    const newUser = {
        Id: uniqid(),
        name,
        surname,
        email,
        date_of_birt,
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`
    }
    console.log(newUser)
    contentFile.push(newUser)
    fs.writeFileSync(userPath, JSON.stringify(contentFile))

    res.status(201).send({ id: newUser.Id })

})


// PUT METHOD
// =============================
usersRouter.put("/:userid", (req, res) => {
    const contentFile = fs.readFileSync(userPath)
    const contentFileArray = JSON.parse(contentFile)

    const findIndex = contentFileArray.findIndex(e => e.id === req.params.userid)
    const updateUser = {
        ...contentFileArray[findIndex],
        ...req.body
    }

    contentFileArray[index] = updateUser
    fs.writeFileSync(userPath, JSON.stringify(contentFile))
    res.send(updateUser)
})


// DELETE METHOD
// =============================
usersRouter.delete("/:userid", (req, res) => {
    const contentFile = fs.readFileSync(userPath) //array in machine language
    const contentFileArray = JSON.parse(contentFile)
    contentFileArray.filter(e => e.id !== req.params.userid)

})

export default usersRouter