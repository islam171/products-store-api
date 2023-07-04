import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    count: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

export default mongoose.model('Order', OrderSchema)