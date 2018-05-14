import { Request, Response, NextFunction } from "express";
import { throws } from "assert";
import { handlerErrors } from "../../errors/handler.error";
import { Category } from "../models/category.model";

const catalogs = [
	{
        code: "LIST_STATUS",
        description: "Lista de Estados",
        catalogDetails: [
            {
                value: "1",
                description: "Activo"
            },
            {
                value: "0",
                description: "Inactivo"
            }
        ],
		status: 1
	}
]

const controller = {
	readByCode: async (req: Request, res: Response) => {
        let code = req.query.code
		let data = catalogs.find((catalog)=>{
			return catalog.code === code
		})
		if(!data) throw new Error(`No se encontró el catálogo: ${code}`)
		res.json({data: data})
	}
}

export { controller }