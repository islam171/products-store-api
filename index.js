import express from "express"
import mongoose from "mongoose";

import {registerValidator} from './validations/Auth.js'
import {productCreateValidator} from "./validations/product.js";
import {addCartValidator} from "./validations/cart.js";

import checkAuth from "./utils/checkAuth.js";
import checkAdmin from "./utils/checkAdmin.js";

import {login, register, authMe} from './controllers/auth.js'
import {
    createProduct,
    deleteProduct,
    getAllProduct,
    getByIdProduct,
    updateProduct,
    getByAuthorProduct
} from './controllers/product.js'
import {
    addCart,
    getCart,
    deleteOneProductOnCart,
    deleteProductOnCart,
    removeCart,
} from './controllers/cart.js'
import {addCategory, deleteCategory, updateCategory, deleteUser} from "./controllers/Admin.js";
import {getCategory, getCategoryById} from "./controllers/category.js";
import {addOrder, deleteOrder, getOrderById, getOrderByUser} from "./controllers/Order.js";

mongoose.connect('mongodb+srv://islam:islam@cluster0.fmfhiig.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()
const PORT = 90

app.use(express.json())

// Auth
app.post('/api/v1/auth/SignUp', registerValidator, register)
app.post('/api/v1/auth/SignIn', login)
app.get('/api/v1/auth/me', checkAuth, authMe)

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
app.delete('/api/v1/cart', checkAuth, removeCart)
app.delete('/api/v1/cart/:id', checkAuth, deleteProductOnCart)
app.patch('/api/v1/cart/:id', checkAuth, deleteOneProductOnCart)

//Category
app.get('/api/v1/category', getCategory)
app.get('/api/v1/category/:id', getCategoryById)

//Admin
//Category
app.post('/api/v1/category', checkAdmin, addCategory)
app.delete('/api/v1/category/:id', checkAdmin, deleteCategory)
app.patch('/api/v1/category/:id', checkAdmin, updateCategory)

//User
app.delete('/api/v1/user', checkAdmin, deleteUser)


//Order
app.get('/api/v1/order', checkAuth, getOrderByUser)
app.get('/api/v1/order/:id', checkAuth, getOrderById)
app.post('/api/v1/order', checkAuth, addOrder)
app.delete('/api/v1/order/:id', checkAuth, deleteOrder)


app.listen(PORT, (error) => {
    if (error) {
        return console.log(error)
    }
    console.log(`Server start in port ${PORT}`)
});