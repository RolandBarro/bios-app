const mongoose = require('mongoose')
const {
    Schema
} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    shortDescription: String,
    detailedDescription: String,
    sellingPrice: Number,
    supplier: String,
    supplierPrice: Number,
    imgUrl: String,
    sku: String,
    dateAdded: {
        type: Number,
        default: Date.now(),
    },
    lastUpdated: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Product', productSchema);