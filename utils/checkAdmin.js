import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export default async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

        if (token) {
            try {
                const decoded = jwt.verify(token, 'islam123')
                req.userId = decoded._id
                const user = await UserModel.findOne({_id: req.userId}).exec()
                if(user.username !== 'islam1'){
                    return res.status(403).json({
                        message: 'Нет доступа'
                    })
                }
                next()
            } catch (e) {
                res.status(403).json({
                    message: 'Нет доступа'
                })
            }
        } else {
            res.status(403).json({
                message: 'Нет доступа'
            })
        }
    } catch (e) {

    }
}