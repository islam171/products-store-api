import ProductModel from '../models/Product.js'
import UserModel from '../models/User.js'

export const getProductsUser = async (req, res) => {
	try {
		const userId = req.userId
		const products = await ProductModel.find({ authorId: userId }).exec()
		res.json(products)
	} catch (e) {
		res.status(404).json({
			message: 'Не удолость получить продукты',
		})
	}
}

export const updateUser = async (req, res) => {
	try {
		const userId = req.userId
		console.log(req.body.username)
		await UserModel.findOneAndUpdate(
			{ _id: userId },
			{
				username: req.body.username,
				avatarURL: req.body.photo,
			}
		)

		const user = await UserModel.findOne({ _id: userId }).exec()
		res.json(user)
	} catch (e) {
		res.status(404).json({
			message: 'Не удалось изменить пользователя',
		})
		console.log(e)
	}
}
