import OrderModel from '../models/Order.js'
import {validationResult} from "express-validator";
import ProductModel from "../models/Product.js";
export const addOrder = async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const userId = req.userId

        const doc = new OrderModel({
            userId,
            productId: req.body.productId,
            count: req.body.count
        })
        const order = await doc.save()
        res.json(order)
    }catch (e) {
        res.status(500).json({
            message: "Не удолось создать заказ"
        })
    }

}

export const deleteOrder = async (req, res) => {
    const userId = req.userId
    const orderId = req.body.orderId

    const order = await ProductModel.findOne({
        _id: orderId,
        userId: userId
    })
    if(!order){

    }
}