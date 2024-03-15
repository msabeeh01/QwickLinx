// creat
const express = require('express')
const router = express.Router()

// import controllerCannot GET /api/products
const {getProducts, addProduct, delProduct, getProductById} = require('../controllers/products')

// routes
router.get('/', getProducts)
router.get('/:id', getProductById)

router.post('/add', addProduct)

router.delete('/del/:id', delProduct)

module.exports = router
