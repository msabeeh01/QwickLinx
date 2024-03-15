//create controllers for a product
// Products model should be imported here
const Products = require('../models/Product')

// returns all products
const getProducts = async (req, res) => {
    try{
        // Fetch all products
        const products = await Products.find()
        if(!products){
            return res.status(404).json({message: 'Products not found'})
        }
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getProductById = async (req, res) => {
    try{
        const id = req.params.id
        const product = await Products.findById(id)
        if(!product){
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// add a product
const addProduct = async (req, res) => {
    try{
        const product = req.body
        const newProduct = new Products(product)
        await newProduct.save()
        res.status(201).json(newProduct)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const delProduct = async (req,res) => {
    try{
        const id = req.params.id
        const deletedProduct = await Products.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json(Products)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {getProducts, addProduct, delProduct, getProductById}

