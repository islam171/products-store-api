import {body} from "express-validator";

export const productCreateValidator = [
    body('title').isString(),
    body('desc').isString(),
    body('categoryId').isLength({min: 11}).isString(),
    body('price').isNumeric(),
    body('imageURL').optional().isString()
]
