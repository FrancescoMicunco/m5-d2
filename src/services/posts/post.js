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
    console.log("URL: ",
        import.meta.url)
    console.log("CURRENT FILE PATH: ", folderpostsPath)

    const postsCurrentFile = fs.readFileSync(postsDb)

    const postsArray = JSON.parse(postsCurrentFile)

    res.send(postsArray)

})


// GET METHOD specific ID
// =============================
postsRouter.get("/:userid", (req, res) => {
    const postsCurrentFile = JSON.parse(fs.readFileSync(postsDb))
    const post = postsCurrentFile.find(p => p.id === req.params.userid)
    res.send(post)
})




// POST METHOD
// =============================

// PUT METHOD
// =============================


// DELETE METHOD
// =============================

postsRouter.delete("/:userid", (req, res) => {
    const postsCurrentFile = JSON.parse(fs.readFileSync(postsDb))
    const remainingPost = postsCurrentFile.filter(p => p.id !== req.params.userid)
    fs.writeFileSync(postsDb, JSON.stringify(remainingPost))
    res.status(204).send()
})


export default postsRouter