const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    description: {
        type: String,
        trim: true,
        required: "Description is Required"
    },
    description_long: {
        type: String,
        trim: true
    },
    code: {
        type: String,
        trim: true,
        required: "Product Code is Required"
    },
    sku: {
        type: String,
        trim: true,
        required: "Product SKU is Required"
    },
    category: {
        type: String,
        trim: true,
        required: "Product Category is Required"
    },
    sub_category: {
        type: String,
        trim: true
    },
    price: {
        //TODO Define a reg ex to make sure this is a decimal
        type: Number,
        required: "Product Price is Required",
        default: 0.00
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deal: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    inventory: [
        {
            descriptor:{
                type: String,
                required: false
            },
            unit:{
                type:String,
                required:false
            },
            unit_type:{
                type:String,
                required:false
            },
            metadata:{
                type:String,
                required:false
            },
            cnt:{
                type:Number,
                required:false,
                default:0
            }
        }
    ],
    images: [
        {
          url: {
            type: String,
            required: false
          },
          alt_text: {
            type: String,
            required: false
          }
    }],
    reviews: [{
        user: {
            type: String,
            required: false
        },
        num_stars:{
            type: Number,
            required: false
        },
        text: {
            type: String,
            required: false
        }
    }]
});

const Product = model("Product", ProductSchema);
module.exports = Product;










