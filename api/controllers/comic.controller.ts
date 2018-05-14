import { Request, Response, NextFunction } from "express"
import { Comic } from "../models/comic.model";
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";

const controller = {
	create: async (req: Request, res: Response) => {
		let comic = new Comic({
			name: req.body.name,
			image: req.body.image,
			categories: req.body.categories,
			createdAt: new Date(),
			updatedAt: null,
			deletedAt: null,
			status: req.body.status
		})
		let data = await comic.save()
		res.json({data: data})
	},
	read: async (req: Request, res: Response) => {
		let comicId = req.params.comicId
		let data: any = await Comic.findById(comicId).populate({ path:'categories', model:'Category'}).where("deletedAt").equals(null)
		if(data.deletedAt) throw new Error("No se encontro el cómic")
		res.json({data: data})
	},
	update: async (req: Request, res: Response) => {
		let comicId = req.params.comicId
		req.body.updatedAt = new Date()
		let data = await Comic.findOneAndUpdate({ _id: comicId }, req.body, { new: true })
		res.json({data: data})
	},
	delete: async (req: Request, res: Response) => {
		let comicId = req.params.comicId
		req.body.deletedAt = new Date()
		let data = await Comic.findOneAndUpdate({ _id: comicId }, req.body, { new: true })
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
		if(queryString.status)
			filter['status'] = queryString.status

		let data = await Comic.find(filter)
			.populate({ path:'categories', model:'Category'})
			.where("deletedAt").equals(null)
			.limit(parseInt(queryString.size))
			.skip(queryString.page * queryString.size)
			.sort(sort)
		let totalElements = await Comic.count()
			.where("deletedAt").equals(null)

		res.json({ data: { content: data, totalElements: totalElements } })
	},
}

export { controller }