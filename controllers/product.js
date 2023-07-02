import ProductModel from "../models/Product.js";
import {validationResult} from "express-validator";

export const getAllProduct = async (req, res) => {
    try {
        const page = req.query._page
        const limit = req.query._limit
        const sort = req.query._sort
        const order = req.query._order

        const skip = page * limit - limit

        const products = await ProductModel.find(null, null, {skip: skip, limit: limit}).sort({ [sort]: order}).populate(['authorId','categoryId']).exec()
        res.json(products)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось получить продукт'})
    }
}

export const getByIdProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await ProductModel.findById(productId).exec()
        res.json(product)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось получить продукт'})
    }
}

export const createProduct = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new ProductModel({
            title: req.body.title,
            desc: req.body.desc,
            categoryId: req.body.categoryId,
            price: req.body.price,
            viewCount: 0,
            imageURL: req.body.imageURL,
            authorId: req.userId
        })

        const post = await doc.save()
        res.json(post)
    } catch (e) {
        res.status(500).json({message: 'Не удолось создать продукт'})
    }
}

export const getByAuthorProduct = async (req, res) => {
    try {
        const authorId = req.userId
        const products = await ProductModel.find({authorId: authorId})
        res.json(products)

    } catch (e) {
        res.status(500).json({message: 'Не удолось получить продукт'})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const userId = req.userId
        const productId = req.params.id

        const product = await ProductModel.findOne({
            _id: productId
        })
        if (!product) {
            return res.status(404).json({message: 'Продукт не найден'})
        }
        // console.log(product[0].authorId.toString(), userId)
        if (product.authorId.toString() != userId) {
            return res.status(404).json({message: "Нет доступа"})
        }
        await ProductModel.deleteOne({
            _id: productId
        })
        res.json({message: 'success'})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось удалить продукт'})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const userId = req.userId
        const productId = req.params.id

        const product = await ProductModel.findOne({
            _id: productId
        })
        if (!product) {
            return res.status(404).json({message: 'Продукт не найден'})
        }
        if (product.authorId.toString() != userId) {
            return res.status(404).json({message: "Нет доступа"})
        }
        await ProductModel.updateOne({
            _id: productId
        },{
            title: req.body.title || product.title,
            desc: req.body.desc || product.desc,
            imageURL: req.body.imageURL || product.imageURL,
            price: req.body.price || product.price,
            categoryId: req.body.categoryId || product.categoryId,
            authorId: req.userId
        })
        res.json({message: 'success'})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось изменить продукт'})
    }
}
