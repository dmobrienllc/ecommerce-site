const router = require('express').Router();

const {
    getAllProducts,
    getProductById,
    getProductByCode,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
  } = require('../../controllers/product-controller');
  
  router.route('/').get(getAllProducts); 
  router.route('/:id').get(getProductById);
  router.route('/code').get(getProductByCode);
  router.route('/category/:cat').get(getProductsByCategory);
  router.route('/').post(createProduct);
  router.route('/:id').put(updateProduct);
  router.route('/:id').delete(deleteProduct);
  
  module.exports = router;

// router.get("/:id", async (req, res) => {
//     console.log("GET/ api/products/", req.body);
//     try {
//         const response = await ProductController.getProductById(req.params.id);

//         res.status(200).json(response);
//     }
//     catch (err) {
//         console.log("Catch", err);
//         res.status(400).json(err);
//     }
// });

//GET all products by category
// router.get("/category", async (req, res) => {
//     try {
//         const response = await ProductController.getProductsByCategory(req.body.category);

//         res.status(200).json(response);
//     }
//     catch (err) {
//         console.log("Catch", err);
//         res.status(400).json(err);
//     }
// });

// router.post("/", async (req, res) => {
//     console.log("POST api/products/", req.body);
//     try {

//         const response = await ProductController.createProduct(req.body);

//         res.status(200).json(response);
//     }
//     catch (err) {
//         console.log("Catch", err);
//         res.status(400).json(err);
//     }
// });

// router.put('/:id', async (req, res) => {
//     try {
//         console.log("PUT api/products/", req.body, " _id", req.params.id);

//         const response = await ProductController.updateProduct(req.params.id,req.body);

//         res.status(200).json(response);

//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     console.log("DELETE api/products/", req.body, " _id", req.params.id);
//     try {
//         const response = await ProductController.deleteProduct(req.params.id);

//         res.status(200).json(response);

//     } catch (err) {
//         res.status(400).json(err);
//     }
// })

module.exports = router;