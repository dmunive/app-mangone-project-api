const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
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

const Category = mongoose.model("Category", schema)

export { Category }

