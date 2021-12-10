import express from "express";
import fs from 'fs'
import path, {
    dirname,
} from "path";
import {
    fileURLToPath
} from "url";
import multer from 'multer'






const publicDir = path.join(dirname(dirname(fileURLToPath(
    import.meta.url))), "../public/authors")
console.log("this is a upload pubic dir", publicDir)

export const upload = multer()

export const uploadFile = (req, res, next) => {
    try {
        const { originalname, buffer } = req.file
        const extension = path.extname(originalname)
        const fileName = `${req.params.id}${extension}`
        console.log("THIS IS PATH DIR", publicDir)
        const pathFile = path.join(publicDir, fileName)
        console.log("THIS IS PATH FILE", pathFile)
        fs.writeFileSync(pathFile, buffer)
        const link = `http://localhost:3001/${req.params.id}${extension}`
        req.file = link
        next()

    } catch (error) {
        next(error)
    }
}