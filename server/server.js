const express = require('express')
const app = express()
const cors = require('cors')

// json middleware
app.use(express.json())

// cors middleware
app.use(cors())

// import db
const db = require('./db/conn')

// import routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

// use routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.listen(3000, () => {
    console.log('Example app listening on port http://localhost:3000 !')
})