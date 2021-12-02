import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import multer from "multer";

const { readJSON, writeJSON, writeFile } = fs;

const postsPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data");
console.log("this is the path", postsPath);

const usersPath = join(dirname(fileURLToPath(
    import.meta.url)), "../data");


const postsPathJSON = join(postsPath, "postsDB.json");

const usersPathJSON = join(usersPath, "usersDB.json");

export const getPost = () => readJSON(postsPathJSON);
export const writePost = (content) => writeJSON(postsPathJSON, content);

export const getUser = () => readJSON(usersPathJSON);
export const writeUser = (content) => writeJSON(usersPathJSON, content);

export const saveAvatar = (filename, contentAsABuffer) => {
    join(writeFile(publicFolder, filename), contentAsABuffer);
};

export const parseImage = multer()
export const upload = (req, res, next) => {
    try {
        console.log(req.file)

        res.send("ok")

    } catch (error) {
        next(error)

    }
}