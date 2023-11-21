import express from 'express'
import mongoose from 'mongoose'

import { registerValidator } from './validations/Auth.js'
import { addCartValidator } from './validations/cart.js'
import { productCreateValidator } from './validations/product.js'

import checkAdmin from './utils/checkAdmin.js'
import checkAuth from './utils/checkAuth.js'

import {
	addCategory,
	deleteCategory,
	deleteUser,
	updateCategory,
} from './controllers/Admin.js'
import { getMe, login, register } from './controllers/auth.js'
import {
	addCart,
	clearCart,
	deleteProductOnCart,
	getCart,
	removeCart,
} from './controllers/cart.js'
import { getCategory, getCategoryById } from './controllers/category.js'
import {
	addOrder,
	deleteOrder,
	getOrderById,
	getOrderByUser,
} from './controllers/Order.js'
import {
	createProduct,
	deleteProduct,
	getAllProduct,
	getByAuthorProduct,
	getByIdProduct,
	updateProduct,
} from './controllers/product.js'

mongoose
	.connect(
		'mongodb+srv://islam:islam@cluster0.fmfhiig.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB ok'))
	.catch(err => console.log('DB error', err))

const app = express()
const PORT = 90

app.use(express.json())

import cors from 'cors'
import { updateUser } from './controllers/User.js'
app.use(cors())

// Auth
app.post('/api/v1/auth/SignUp', registerValidator, register)
app.post('/api/v1/auth/SignIn', login)
app.get('/api/v1/auth/me', checkAuth, getMe)

// product
app.post('/api/v1/product', checkAuth, productCreateValidator, createProduct)
app.get('/api/v1/product', getAllProduct)
app.get('/api/v1/product/author', checkAuth, getByAuthorProduct)
app.get('/api/v1/product/:id', getByIdProduct)
app.delete('/api/v1/product/:id', checkAuth, deleteProduct)
app.patch('/api/v1/product/:id', checkAuth, updateProduct)

// Cart
app.post('/api/v1/cart', checkAuth, addCartValidator, addCart)
app.get('/api/v1/cart', checkAuth, getCart)
app.delete('/api/v1/cart/clear', checkAuth, clearCart)
app.delete('/api/v1/cart/:id', checkAuth, removeCart)
app.patch('/api/v1/cart/:id', checkAuth, deleteProductOnCart)

//Category
app.get('/api/v1/category', getCategory)
app.get('/api/v1/category/:id', getCategoryById)

//Admin//
//Category
app.post('/api/v1/category', checkAdmin, addCategory)
app.delete('/api/v1/category/:id', checkAdmin, deleteCategory)
app.patch('/api/v1/category/:id', checkAdmin, updateCategory)

//User
app.delete('/api/v1/user', checkAdmin, deleteUser)
app.patch('/api/v1/user', checkAuth, updateUser)

//Order
app.get('/api/v1/order', checkAuth, getOrderByUser)
app.get('/api/v1/order/:id', checkAuth, getOrderById)
app.post('/api/v1/order', checkAuth, addOrder)
app.delete('/api/v1/order/:id', checkAuth, deleteOrder)

app.listen(PORT, error => {
	if (error) {
		return console.log(error)
	}
	console.log(`Server start in port ${PORT}`)
})
