const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Category name is required."
    }
});

const Category = model("Category",CategorySchema);
module.exports = Category;