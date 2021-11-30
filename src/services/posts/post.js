import fs from 'fs'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import uniqid from "uniqid"

const postsRouter = express.Router()


// take file path
const postsPath = fileURLToPath(
    import.meta.url)
console.log("this is the current post path", postsPath)

// take folder path
const folderpostsPath = dirname(postsPath)
console.log("this is the current folder path", folderpostsPath)

//  access db file
const postsDb = join(folderpostsPath, "postsDB.json")


// GET METHOD
// =============================

postsRouter.get("/", (req, res) => {
    const postsCurrentFile = fs.readFileSync(postsDb)
    console.log("file content:",
        JSON.parse(postsCurrentFile))
    const postsArray = JSON.parse(postsCurrentFile)
    res.send(postsArray)

})


// GET METHOD specific ID
// =============================
postsRouter.get("/:userid", (req, res) => {
    const postsCurrentFile = fs.readFileSync(postsDb)
})




// POST METHOD
// =============================

// PUSH METHOD
// =============================


// DELETE METHOD
// =============================




export default postsRouter