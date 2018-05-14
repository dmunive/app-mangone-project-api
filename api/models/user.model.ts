const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
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

const User = mongoose.model("User", schema)

export { User }

