import express from "express";
import listEndpoints from "express-list-endpoints";

import path, {
    dirname,
} from "path";
import {
    fileURLToPath
} from "url";
import multer from 'multer'

const publicDir = path.join(dirname(fileURLToPath(
    import.meta.url)), "../public/authors")
console.log("this is a upload pubic dir", publicDir)

export const upload = multer()

export const uploadFile = (req, res, next) => {
    try {
        console.log("this is the file", req.file)
        console.log("this is a upload pubic dir", publicDir)
        res.send("Done!")

    } catch (error) {
        next(error)
    }
}