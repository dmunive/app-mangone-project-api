import { Request, Response, NextFunction } from "express"

interface IError extends Error {
	status?: number
}

const handlerErrors = {
	catch: (ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
		return (rq: Request, rs: Response, nxt: NextFunction) => {
			return ftn(rq, rs, nxt).catch(nxt)
		}
	},
	notFound: (req: Request, res: Response, next: NextFunction) => {
		const error: IError = new Error("Not found")
		error.status = 404
		next(error)
	},
	generic: (error: IError, req: Request, res: Response, next: NextFunction) => {
		res.json({
			message: error.message,
			stack: error.stack,
			status: error.status
		})
	}
}

export { handlerErrors }