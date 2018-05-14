import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/category.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.post("/", handlerErrors.catch(controller.create))
router.get("/:categoryId", handlerErrors.catch(controller.read))
router.put("/:categoryId", handlerErrors.catch(controller.update))
router.delete("/:categoryId", handlerErrors.catch(controller.delete))
router.get("/", handlerErrors.catch(controller.search))

export { router }