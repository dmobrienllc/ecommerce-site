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
router.route('/code/:code').get(getProductByCode);
router.route('/category/:cat').get(getProductsByCategory);
router.route('/').post(createProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

module.exports = router;