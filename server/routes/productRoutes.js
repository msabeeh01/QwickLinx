// creat
const express = require('express')
const router = express.Router()

// import controllerCannot GET /api/products
const {getProducts, addProduct, delProduct} = require('../controllers/products')

// routes
router.get('/', getProducts)

router.post('/add', addProduct)

router.delete('/del/:id', delProduct)

module.exports = router
