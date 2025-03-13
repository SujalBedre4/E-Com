const mongoose = require('mongoose')

// Here, we are defining the schema's:

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model("users",userSchema)

// Here, one is the collections name and another is the set of Rules for that Schema.