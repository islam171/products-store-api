import CategoryModel from "../models/Category.js";
import ProductModel from "../models/Product.js";
import UserModel from "../models/User.js";

//Product
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id

        const product = await ProductModel.findOne({
            _id: productId
        })
        if (!product) {
            return res.status(404).json({message: 'Продукт не найден'})
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

//User
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        await UserModel.deleteOne({
            _id: userId
        })
        res.json({message: 'success'})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось удалить пользовотеля'})
    }
}

//Category
export const addCategory = async (req, res) => {
    try {
        const doc = new CategoryModel({
            name: req.body.name
        })

        const category = await doc.save()
        res.json(category)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось создать категорию'})
    }

}
export const deleteCategory = async (req, res) => {
    try {

        const categoryId = req.params.id
        const category = await CategoryModel.deleteOne({_id: categoryId}).exec()
        if (category) {
            console.log(e)
            return res.status(500).json({message: 'Не удолось удалить категорию'})
        }
        res.json({message: 'success'})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось удалить категорию'})
    }
}
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const categoryName = req.body.name
        const category = await CategoryModel.updateOne({
            _id: categoryId
        }, {
            name: categoryName
        }).exec()

        res.json({message: 'success'})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось обновить категорию'})
    }
}

