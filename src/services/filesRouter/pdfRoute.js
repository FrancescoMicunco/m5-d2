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
        pipeline(source, destination)
    } catch (error) {

    }
})



export default pdfRouter