const { Product } = require('../models');

module.exports = {

    async getAllProducts(req, res) {
        const products = await Product.find({}).lean();

        if (!products) {
            return res.status(400).json({ message: 'Unable to retrieve products'});
        }
        res.status(200).json(products);
    },
    async getProductById(req, res) {
        console.log("product-controller getProductById", req.params.id);
        const product = await Product.findById({ "_id": req.params.id }).lean();

        if (!product) {
            return res.status(400).json({ message: `Unable to find product for id ${req.params.id}` });
        }
        res.status(200).json(product);
    },
    async getProductByCode(req, res) {
        console.log("product-controller getProductByCode", req.params.code);

        const product = await Product.findOne({ "code": req.params.code }).lean();

        if (!product) {
            return res.status(400).json({ message: `Unable to find products for code ${req.params.code}` });
        }
        res.status(200).json(product);
    },
    async getProductsByCategory(req, res) {
        console.log("product-controller getProductsByCategory", req.params.cat);
        const products = await Product.find({ "category": req.params.cat }).lean();

        if (!products) {
            return res.status(400).json({ message: `Unable to find products for category ${req.body.category}` });
        }
        res.status(200).json(products);
    },
    async createProduct(req, res) {
        console.log("product-controller createProduct");
        console.log(req.body);
        const product = await Product.create(req.body);

        if (!product) {
            return res.status(400).json({ message: 'Unable to create product' });
        }
        res.status(200).json(product);
    },
    async updateProduct(req, res) {
        console.log("product-controller updateProduct", req.params.id);
        const product = await Product.findOneAndUpdate({ "_id": req.params.id },
            req.body,
            { new: true });

        if (!product) {
            return res.status(400).json({ message: `Possible error occurred updating product id: ${req.params.id}` });
        }
        res.status(200).json(product);
    },
    async deleteProduct(req, res) {
        console.log("product-controller deleteProduct", id);

        const response = await Product.remove({ "_id": req.params.id });

        res.status(200).json(response);
    }
}






