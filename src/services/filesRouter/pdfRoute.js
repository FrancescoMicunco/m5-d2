import express from 'express'
import createHttpError from "http-errors"
import {
    getReadble
} from '../../lib/pdf.js'
import {
    pipeline
} from 'stream';

const pdfRouter = express.Router()

pdfRouter.get("/downloadPDF", async(req, res, next) => {
    try {
        res.setHeader(
            "Content-Disposition", "attachement; filename="
        )
        const source = getReadble({ file: "name" })
        const destination = res
        pipeline(source, destination, err => {
            if (err) console.log(err)
            console.log("stream OK")
        })
    } catch (error) {

    }
})



export default pdfRouter