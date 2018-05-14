import { Request, Response, NextFunction } from "express"
import { User } from "../models/user.model";
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";

const controller = {
	signin: async (req: Request, res: Response) => {
		let user: any = await User.findOne({
			email: req.body.email,
			password: req.body.password
		})
			.select("-password")
			.where("deletedAt").equals(null)
		if (!user) throw new Error("No se encontro el usuario")
		res.json({ data: user })
	}
}

export { controller }