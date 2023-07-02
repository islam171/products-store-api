import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: String,
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    viewCount:{
        type: Number,
        default: 0
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageURL: String,
}, {
    timestamps: true
})

export default mongoose.model('Product', ProductSchema)