// Imports
import { Request, Response, NextFunction, Application } from "express"
import express = require("express")
import mongoose = require("mongoose")
import bodyParser = require("body-parser")
import { router as userRouter } from "../routes/user.route"
import { router as categoryRouter } from "../routes/category.route"
import { router as catalogRouter } from "../routes/catalog.route"
import { router as comicRouter } from "../routes/comic.route"
import { router as chapterRouter } from "../routes/chapter.route"
import { router as pageRouter } from "../routes/page.route"
import { router as authenticationRouter } from "../routes/authentication.route"

import { handlerErrors } from "../errors/handler.error"

require("dotenv").config({ path: "./environment.env" })
const cors = require('cors')
const corsOptions = {
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
    methods: ['GET' ,'PUT', 'POST', 'DELETE', 'OPTIONS']
}

// Declarations
const app: Application = express()
app.set("port", process.env.PORT)

mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on("error", (error) => console.log(error))

// Middlewares
app.use(cors(corsOptions))
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/admin/users", userRouter)
app.use("/admin/categories", categoryRouter)
app.use("/admin/catalogs", catalogRouter)
app.use("/admin/comics", comicRouter)
app.use("/admin/comics", chapterRouter)
app.use("/admin/comics", pageRouter)
app.use("/auth", authenticationRouter)

// Errors
app.use(handlerErrors.notFound)
app.use(handlerErrors.generic)

// Servidor
app.listen(app.get("port"), () => console.log(`Server is running in the port ${app.get("port")}`))


