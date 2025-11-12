// // routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// router.get('/', productController.getAllProducts);
// router.get('/:id', productController.getProductById);
// router.post('/', productController.createProduct);
// router.put('/:id', productController.updateProduct);
// router.delete('/:id', productController.deleteProduct);

// module.exports = router;

// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const apiKeyAuth = require('../middleware/auth'); 

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', apiKeyAuth, productController.createProduct);
router.put('/:id', apiKeyAuth, productController.updateProduct);
router.delete('/:id', apiKeyAuth, productController.deleteProduct);

module.exports = router;
