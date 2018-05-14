import { Request, Response, NextFunction } from "express"
import { User } from "../models/user.model";
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";

const controller = {
	create: async (req: Request, res: Response) => {
		let user = new User({
			name: req.body.name,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			createdAt: new Date(),
			updatedAt: null,
			deletedAt: null,
			status: req.body.status
		})
		let data = await user.save()
		res.json({data: data})
	},
	read: async (req: Request, res: Response) => {
		let userId = req.params.userId
		let data: any = await User.findById(userId)
		if(data.deletedAt) throw new Error("No se encontro el usuario")
		res.json({data: data})
	},
	update: async (req: Request, res: Response) => {
		let userId = req.params.userId
		if(!req.body.password) delete req.body["password"] 
		req.body.updatedAt = new Date()
		let data = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
		res.json({data: data})
	},
	delete: async (req: Request, res: Response) => {
		let userId = req.params.userId
		req.body.deletedAt = new Date()
		let data = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
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
		if(queryString.lastName)
			filter['lastName'] = { $regex: `.*${queryString.lastName}.*`}
		if(queryString.email)
			filter['email'] = { $regex: `.*${queryString.email}.*`}
		if(queryString.status)
			filter['status'] = queryString.status

		let data = await User.find(filter)
			.where("deletedAt").equals(null)
			.limit(parseInt(queryString.size))
			.skip(queryString.page * queryString.size)
			.sort(sort)
		let totalElements = await User.count()
			.where("deletedAt").equals(null)

		res.json({ data: { content: data, totalElements: totalElements } })
	},
}

export { controller }