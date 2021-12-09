import json2csv from "json2csv"
import express from "express";
import {
    getUsersReadableStream
} from '../../lib/streamCSV.js'

const filesRouter = express.Router()

filesRouter.get("/downloadCSV", (req, res, next) => {
    try {
        res.setHeader("Content-Disposition", "attachment; filename=users.csv")
        const source = getUsersReadableStream()
        transform = new json2csv.Transform({ fields: ["id", "name", "surname", "email", "dateOfBirth", "avatar"] })
        const destination = res
        pipeline(source, transform, destination, err => {
            if (err) next(err)
        })
    } catch (error) {
        next(error)
    }
})

export default filesRouter