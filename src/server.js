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

import { publicPath } from './lib/functions'

const server = express()
const port = 3001
    // =================  MIDDELWARES ===============
    //==============================================







server.use(cors())
server.use(express.json())
server.use(express.static(publicPath))
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

server.listen(port, () => { console.log("server is running") })