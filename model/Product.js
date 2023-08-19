import mongoose, {Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    title: {type: String, require: true},
    description: String,
    price: {type: Number, require: true},
    images: [{type: String}],
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;
// module.exports = mongoose.models.Product || mongoose.model('product', ProductSchema);