import {body} from "express-validator";

export const addCartValidator = [
    body('productId').isString()
]
