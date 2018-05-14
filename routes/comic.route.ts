import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/comic.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.post("/", handlerErrors.catch(controller.create))
router.get("/:comicId", handlerErrors.catch(controller.read))
router.put("/:comicId", handlerErrors.catch(controller.update))
router.delete("/:comicId", handlerErrors.catch(controller.delete))
router.get("/", handlerErrors.catch(controller.search))

export { router }