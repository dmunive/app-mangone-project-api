import { Request, Response, NextFunction } from "express"
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";
import { Category } from "../models/category.model";
import { awaitExpression } from "babel-types";

const controller = {
	create: async (req: Request, res: Response) => {
		let category = new Category({
			name: req.body.name,
			createdAt: new Date(),
			updatedAt: null,
			deletedAt: null,
			status: req.body.status
		})
		let data = await category.save()
		res.json({ data: data })
	},
	read: async (req: Request, res: Response) => {
		let categoryId = req.params.categoryId
		let data: any = await Category.findById(categoryId).where("deletedAt").equals(null)
		if (data.deletedAt) throw new Error("No se encontro la categoría")
		res.json({ data: data })
	},
	update: async (req: Request, res: Response) => {
		let categoryId = req.params.categoryId
		req.body.updatedAt = new Date()
		let data = await Category.findOneAndUpdate({ _id: categoryId }, req.body, { new: true })
		res.json({ data: data })
	},
	delete: async (req: Request, res: Response) => {
		let categoryId = req.params.categoryId
		req.body.deletedAt = new Date()
		let data = await Category.findOneAndUpdate({ _id: categoryId }, req.body, { new: true })
		res.json({ data: data })
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

		let data = await Category.find(filter)
			.where("deletedAt").equals(null)
			.limit(parseInt(queryString.size))
			.skip(queryString.page * queryString.size)
			.sort(sort)
		let totalElements = await Category.count()
			.where("deletedAt").equals(null)

		res.json({ data: { content: data, totalElements: totalElements } })
	},
}

export { controller }