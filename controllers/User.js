import ProductModel from "../models/Product.js";

export const getProductsUser = async (req, res) => {
    try{
        const userId = req.userId
        const products = await ProductModel.find({authorId: userId}).exec()
        res.json(products)

    }catch (e) {
        res.status(404).json({
            'message': "Не удолость получить продукты"
        })
    }
}