const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	comic: {
		type: mongoose.Schema.ObjectId,
		ref: "Comic",
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

const Chapter = mongoose.model("Chapter", schema)

export { Chapter }

