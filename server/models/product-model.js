var mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
  })
  
  const ProductModel = mongoose.model('Product', productSchema);
  module.exports = ProductModel;