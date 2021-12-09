import fs from "fs-extra" // 3rd party module
import {
    fileURLToPath
} from "url"
import {
    dirname,
    join
} from "path"

const {

    createReadStream
} = fs


const dataFolderPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data")
console.log(dataFolderPath)
const usersJSONPath = join(dataFolderPath, "users.json")


export const getUsersReadableStream = () => createReadStream(usersJSONPath)