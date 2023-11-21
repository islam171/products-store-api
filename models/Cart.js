import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		count: Number,
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Cart', CartSchema)
