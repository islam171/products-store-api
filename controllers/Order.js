import OrderModel from '../models/Order.js'
import {validationResult} from "express-validator";

export const addOrder = async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const authorId = req.userId

        const doc = new OrderModel({
            userId: authorId,
            productId: req.body.productId,
            count: req.body.count
        })

        const order = await doc.save()
        const {userId, ...oldOrder} = order._doc
        res.json(oldOrder)
    }catch (e) {
        res.status(500).json({
            message: "Не удолось создать заказ"
        })
    }

}

export const deleteOrder = async (req, res) => {
    try{
        const userId = req.userId
        const orderId = req.params.id

        const order = await OrderModel.findOne({
            userId,
            _id: orderId
        }).exec()
        console.log(order)
        if(!order){
            return res.status(404).json({message: 'Не удалось найти заказ'})
        }
        await OrderModel.deleteOne({_id: orderId})
        res.status(203).json({message: 'success'})
    }catch (e) {
        res.status(500).json({message: 'Не удолось удалить заказ'})
    }
}

export const getOrderByUser = async (req, res) => {
    try{
        const userId = req.userId
        const orders = await OrderModel.find({userId: userId}).exec()

        res.json(orders)

    }catch (e) {
        res.status(500).json({message: 'Не удолось получить заказы'})
    }
}

export const getOrderById = async (req, res) => {
    try{
        const userId = req.userId
        const orderId = req.params.id
        const order = await OrderModel.find({_id: orderId, userId: userId}).exec()
        if(!order){
            res.status(404).json({message: 'Не удалось найти заказ'})
        }

        res.json(order)

    }catch (e) {
        res.status(500).json({message: 'Не удолось получить заказы'})
    }
}