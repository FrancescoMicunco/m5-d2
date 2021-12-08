import express from "express";
import listEndpoints from "express-list-endpoints";
import usersRouter from "./services/users/users.js"
import blogpostsRouter from "./services/blogposts/index.js"
import cors from "cors"
import {
    badRequest,
    unauthorized,
    notFound,
    genericErr
} from './errorHandler.js'
import {
    dirname,
    join
} from "path";
import createHttpError from "http-errors";


// import { publicPath } from '../src/lib/functions'

const server = express()
const port = process.env.PORT || 3001
    // server.use(express.static(dirname, '/public'))
    // =================  MIDDELWARES ===============
    //==============================================

const whiteList = [process.env.REACT_APP_FE_REMOTE_URL, process.env.REACT_APP_FE_LOCAL_URL]
const corsOption = {
    origin: function(origin, next) {
        if (!origin || whiteList.indexOf(origin) !== -1) { next(null, true) } else { next(new Error("Cors Error occurred!")) }
    }
}
server.use(cors(corsOption))
server.use(express.json())

//================ END POINT ====================
//===============================================


server.use("/users", usersRouter)
server.use("/posts", blogpostsRouter)


// ===================  ERROR =======================
//===================================================

server.use(badRequest)
server.use(unauthorized)
server.use(notFound)
server.use(genericErr)

// ===================  LISTENING SECTION =======================
//===================================================


console.table(listEndpoints(server))

server.listen(port, () => { console.log(`server is running on ${port}`) })