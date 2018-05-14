import { Request, Response, NextFunction } from "express"
import express = require("express")
import { controller } from "../api/controllers/user.controller"
import { handlerErrors } from "../errors/handler.error"

const router = express.Router()

router.post("/", handlerErrors.catch(controller.create))
router.get("/:userId", handlerErrors.catch(controller.read))
router.put("/:userId", handlerErrors.catch(controller.update))
router.delete("/:userId", handlerErrors.catch(controller.delete))
router.get("/", handlerErrors.catch(controller.search))

export { router }