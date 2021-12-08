import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const { readJSON, writeJSON, writeFile } = fs;

const dataPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data");

const usersPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data");


const dataPathJSON = join(dataPath, "postsDB.json");

export const publicPath = join(process.cwd(), 'public');

const usersPathJSON = join(usersPath, "usersDB.json");


const authorsAvatar = join(publicPath, 'authors');

const authorsCover = join(publicPath, 'covers');

export const getPost = () => readJSON(dataPathJSON);
export const writePost = (content) => writeJSON(dataPathJSON, content);

export const getUser = () => readJSON(usersPathJSON);
export const writeUser = (content) => writeJSON(usersPathJSON, content);

// export const saveAvatar = (id, filename, fileValue) => {
//     const files = await getUser()
//     const index = files.findIndex(f => f.id === id)
//     if (index !== -1) {
//         const searchedFile = files[index]
//         const updateFile = {...searchedFile,
//             [filename]: fileValue,
//             updatedAt: new Date()
//         }
//         files[index] = updateFile
//         await writeJSON(dataPathJSON)
//         return updateFile

//     } else {
//         console.log(error)
//     }
// };

export const saveCover = (filename, contentAsABuffer) => {
    join(writeFile(authorsCover, filename), contentAsABuffer);
};