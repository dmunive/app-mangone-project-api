import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/catalog.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.get("/", handlerErrors.catch(controller.readByCode))

export { router }