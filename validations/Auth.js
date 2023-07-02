import {body} from "express-validator";

export const registerValidator = [
    body('username').isLength({min: 5}),
    body('password').isLength({min: 5}),
    body('avatarURL').optional().isURL()
]

export const loginValidator = [
    body('username').isLength({min: 5}),
    body('password').isLength({min: 5})
]