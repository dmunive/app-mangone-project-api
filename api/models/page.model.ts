const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	number: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	chapter: {
		type: mongoose.Schema.ObjectId,
		ref: "Chapter",
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

const Page = mongoose.model("Page", schema)

export { Page }

