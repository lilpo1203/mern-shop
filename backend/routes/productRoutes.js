import express from 'express'
const router = express.Router()
import {getProducts, getProductById,deleteProduct,createProduct,updateProduct, createProductReview,getTopProducts} from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

router.route('/').get(getProducts).post(protect,admin, createProduct)
router.get('/top',getTopProducts)

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
router.route('/:id').get(getProductById).delete(protect,admin, deleteProduct).put(protect,admin, updateProduct)


router.route('/:id/reviews').post(protect,createProductReview)
export default router