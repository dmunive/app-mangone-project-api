import { Request, Response, NextFunction } from "express"
import { Chapter } from "../models/chapter.model";
import { Page } from "../models/page.model";
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";

const controller = {
	create: async (req: Request, res: Response) => {
		let chapterId = req.params.chapterId
		let page = new Page({
			number: req.body.number,
			image: req.body.image,
			chapter: {_id: chapterId},
			createdAt: new Date(),
			updatedAt: null,
			deletedAt: null,
			status: req.body.status
		})
		let data = await page.save()
		res.json({data: data})
	},
	read: async (req: Request, res: Response) => {
		let pageId = req.params.pageId
		let data: any = await Page.findById(pageId).populate({ path:'chapter', model:'Chapter'}).where("deletedAt").equals(null)
		if(data.deletedAt) throw new Error("No se encontro la pàgina")
		res.json({data: data})
	},
	update: async (req: Request, res: Response) => {
		let pageId = req.params.pageId
		req.body.updatedAt = new Date()
		let data = await Page.findOneAndUpdate({ _id: pageId }, req.body, { new: true })
		res.json({data: data})
	},
	delete: async (req: Request, res: Response) => {
		let pageId = req.params.pageId
		req.body.deletedAt = new Date()
		let data = await Page.findOneAndUpdate({ _id: pageId }, req.body, { new: true })
		res.json({data: data})
	},
	search: async (req: Request, res: Response) => {
		let queryString: any = req.query

		let sort: any = {}
		if (queryString.sort) {
			let querySort = queryString.sort.split(",")
			let sortBy: string = querySort[0]
			let orientation: boolean = querySort[1]
			sort[sortBy] = orientation
		}

		var filter: any = {}
		if(queryString.number)
			filter['number'] = queryString.number
		if(queryString.status)
			filter['status'] = queryString.status

		let data = await Page.find(filter)
			.populate({ path:'chapter', model:'Chapter'})
			.where("deletedAt").equals(null)
			.limit(parseInt(queryString.size))
			.skip(queryString.page * queryString.size)
			.sort(sort)
		let totalElements = await Page.count()
			.where("deletedAt").equals(null)

		res.json({ data: { content: data, totalElements: totalElements } })
	},
}

export { controller }