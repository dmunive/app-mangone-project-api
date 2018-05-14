import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/chapter.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.post("/:comicId/chapters", handlerErrors.catch(controller.create))
router.get("/:comicId/chapters/:chapterId", handlerErrors.catch(controller.read))
router.put("/:comicId/chapters/:chapterId", handlerErrors.catch(controller.update))
router.delete("/:comicId/chapters/:chapterId", handlerErrors.catch(controller.delete))
router.get("/:comicId/chapters", handlerErrors.catch(controller.search))

export { router }