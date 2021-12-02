import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { readJSON, writeJSON, writeFile } = fs
const postsPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data")
console.log("this is the path", postsPath)

const postsPathJSON = join(postsPath, "postsDB.json")

export const getPost = () => readJSON(postsPathJSON)

export const writePost = content => writeJSON(postsPathJSON, content)