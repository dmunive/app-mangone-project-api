import { Request, Response, NextFunction } from "express"
import { Chapter } from "../models/chapter.model";
import { Comic } from "../models/comic.model";
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";

const controller = {
	create: async (req: Request, res: Response) => {
		let comicId = req.params.comicId
		let chapter = new Chapter({
			name: req.body.name,
			number: req.body.number,
			image: req.body.image,
			comic: {_id: comicId},
			createdAt: new Date(),
			updatedAt: null,
			deletedAt: null,
			status: req.body.status
		})
		let data = await chapter.save()
		res.json({data: data})
	},
	read: async (req: Request, res: Response) => {
		let chapterId = req.params.chapterId
		let data: any = await Chapter.findById(chapterId).populate({ path:'comic', model:'Comic'}).where("deletedAt").equals(null)
		if(data.deletedAt) throw new Error("No se encontro el capítulo")
		res.json({data: data})
	},
	update: async (req: Request, res: Response) => {
		let chapterId = req.params.chapterId
		req.body.updatedAt = new Date()
		let data = await Chapter.findOneAndUpdate({ _id: chapterId }, req.body, { new: true })
		res.json({data: data})
	},
	delete: async (req: Request, res: Response) => {
		let chapterId = req.params.chapterId
		req.body.deletedAt = new Date()
		let data = await Chapter.findOneAndUpdate({ _id: chapterId }, req.body, { new: true })
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
		if(queryString.name)
			filter['name'] = { $regex: `.*${queryString.name}.*`}
		if(queryString.number)
			filter['number'] = queryString.number
		if(queryString.status)
			filter['status'] = queryString.status

		let data = await Chapter.find(filter)
			.populate({ path:'comic', model:'Comic'})
			.where("deletedAt").equals(null)
			.limit(parseInt(queryString.size))
			.skip(queryString.page * queryString.size)
			.sort(sort)
		let totalElements = await Chapter.count()
			.where("deletedAt").equals(null)

		res.json({ data: { content: data, totalElements: totalElements } })
	},
}

export { controller }