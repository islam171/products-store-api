import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})

        if (!user) {
            return res.status(404).json({
                message: 'Пользовотель не найден'
            })
        }

        if (user.password != req.body.password) {
            return res.status(404).json({
                message: "Неверный пароль"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'islam123', {
            expiresIn: '3d'
        })

        const {password, ...userdata} = user._doc

        res.json({
            ...userdata, token
        })
    } catch (e) {
        res.status(500).json({message: 'Не удолось авторизоватся'})
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = UserModel({
            username: req.body.username, password: req.body.password, avatarURL: req.body.avatarURL
        })
        const oldUser = await UserModel.findOne({username: req.body.username})
        if (oldUser) {
            return res.status(404).json({success: 'Такой пользовотель'})
        }
        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 'islam123', {
            expiresIn: '3d'
        })

        const {password, ...userdata} = user._doc

        res.json({userdata, token})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось зарегистрироватся'})
    }
}

export const authMe = async (req, res) => {
    const user = await UserModel.findById(req.userId)
    if (!user) {
        return res.status(404).json({
            message: "Пользовотель не найден"
        })
    }
    const {password, ...userdata} = user._doc

    res.json(userdata)
}