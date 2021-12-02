import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { readJSON, writeJSON, writeFile } = fs
const postsPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data")
console.log("this is the path", postsPath)

const usersPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data")

const publicFolder = join(process.cwd(), "./public/img/authors")

const postsPathJSON = join(postsPath, "postsDB.json")

const usersPathJSON = join(usersPath, "usersDB.json")


export const getPost = () => readJSON(postsPathJSON)
export const writePost = content => writeJSON(postsPathJSON, content)

export const getUser = () => readJSON(usersPathJSON)
export const writeUser = content => writeJSON(usersPathJSON, content)

export const saveAvatar = (filename, contentAsABuffer) => {
    join(writeFile(publicFolder, filename), contentAsABuffer)
}