import CategoryModel from "../models/Category.js";

export const getCategory = async (req, res) => {
    try {

        const category = await CategoryModel.find().exec()
        res.json({
            message: 'success',
            category: category
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось получить список категори'})
    }
}
export const getCategoryById = async (req, res) => {
    try{

        const categoryId = req.params.id

        const category = await CategoryModel.find({_id: categoryId}).exec()

        res.json({message: 'success', category: category})

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолось получить категорию'})
    }
}