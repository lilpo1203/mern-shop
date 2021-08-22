import express from 'express'
const router = express.Router()
import {authUser, getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUsersById, updateUser} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser).get(protect,admin, getUsers)
router.route('/:id').delete(protect,admin, deleteUser).get(protect, admin, getUsersById).put(protect, admin, updateUser)



export default router