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
            "Content-Disposition", "attachement; filename=newfile.pdf"

        )
        const source = getReadble()
        const destination = res
        pipeline(source, destination, err => {
            if (err) next(err)

        })
    } catch (error) {
        next(err)
    }
})



export default pdfRouter