import {validationResult} from "express-validator";
import CartModel from "../models/Cart.js";
import ProductModel from "../models/Product.js";

export const addCart = async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const userId = req.userId
        const productId = req.body.productId
        let count = 1

        const oldProduct = await ProductModel.findOne({_id: productId}).exec()
        if(!oldProduct){
            return res.status(404).json({message: 'Продукт с таким id не существует'})
        }

        const cart = await CartModel.findOne({productId: productId, userId: userId}).exec()
        if(cart){
            count = cart.count + 1
            await CartModel.updateOne({_id: cart._id}, {
                userId: userId,
                productId: productId,
                count: count
            })
            res.json({message: 'success'})
        }else{
            const doc = new CartModel({
                userId: userId,
                productId: productId,
                count: count
            })

            const product = await doc.save()
            res.json(product)
        }

    }catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось получить продукты'})
    }
}

export const getCart = async (req, res) => {
    try{
        const userId = req.userId
        const product = await CartModel.find({userId: userId}).exec()

        res.json(product)

    }catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось получить продукты'})
    }
}

export const deleteProductOnCart = async (req, res) => {
    try{
        const userId = req.userId
        const productId = req.body.id

        const product = await CartModel.findOneAndDelete({userId: userId, productId: productId}).exec()
        if(!product){
            console.log(product)
            return res.status(404).json({message: 'Не удалось найти продукт'})
        }
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось получить продукты'})
    }
}

export const deleteOneProductOnCart = async (req, res) => {
    try{
        const userId = req.userId
        const productId = req.body.id

        const product = await CartModel.findOne({userId: userId, productId: productId}).exec()
        if(!product){
            console.log(product)
            return res.status(404).json({message: 'Не найти продукт'})
        }
        const cart = await CartModel.updateOne({userId: userId, productId: productId}, {count: product.count - 1})
        if(!cart){
            console.log(product)
            res.status(404).json({message: 'Не удалось удалить продукты'})
        }
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(404).json({message: 'Не удалось удалить продукты'})
    }
}

export const removeCart = async (req, res) => {
    try{
        const userId = req.userId

        const cart = CartModel.deleteMany({userId: userId}).exec()
        if(!cart){
            return res.status(404).json({message: "Не удолось очистить корзину"})
        }
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(404).json({message: "Не удолось очистить корзину"})
    }
}
