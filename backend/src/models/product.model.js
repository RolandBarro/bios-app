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
    supplierPrice: String,
    imgUrl: String,
    sku: {
        type: String,
        unique: true,
    },
    dateAdded: {
        type: Number,
        default: Date.now(),
    },
    dateUpdated: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Product', productSchema);