import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/authentication.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.post("/signin", handlerErrors.catch(controller.signin))

export { router }