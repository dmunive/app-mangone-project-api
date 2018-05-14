import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/page.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.post("/:comicId/chapters/:chapterId/pages", handlerErrors.catch(controller.create))
router.get("/:comicId/chapters/:chapterId/pages/:pageId", handlerErrors.catch(controller.read))
router.put("/:comicId/chapters/:chapterId/pages/:pageId", handlerErrors.catch(controller.update))
router.delete("/:comicId/chapters/:chapterId/pages/:pageId", handlerErrors.catch(controller.delete))
router.get("/:comicId/chapters/:chapterId/pages", handlerErrors.catch(controller.search))

export { router }