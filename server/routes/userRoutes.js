const express = require('express')
const router = express.Router()

const {Login, Register, createOrder, getOrders, deleteOrder} = require('../controllers/users')

router.post('/register', Register)
router.post('/login', Login)

router.post('/order', createOrder)

router.get('/orders', getOrders)

router.delete('/del/:id', deleteOrder)

module.exports = router