const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,  //For category
    userId: String,  //Who is adding that product
    company: String  //
})

module.exports = mongoose.model("poducts", productSchema)