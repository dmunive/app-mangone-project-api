const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	categories: [ 
		{
			type: mongoose.Schema.ObjectId,
			ref: "Category",
			required: true
		}
	],
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: {
		type: Date,
		required: false
	},
	deletedAt: {
		type: Date,
		required: false
	},
	status: {
		type: Number,
		required: true
	}
})

const Comic = mongoose.model("Comic", schema)

export { Comic }

