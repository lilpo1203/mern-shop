import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


// @desc    create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req,res) => {
    const {orderItems,
        shippingAddress, 
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error("No order items")
    }else{
        const order = new Order({
        orderItems,
        user:req.user._id,
        shippingAddress, 
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})

// @desc    get order by ID
// @route   get /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req,res) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email')
   if(order){
       res.json(order)
   }else{
       res.status(404)
       throw new Error('Error not found')
   }
})


// @desc    update order to paid
// @route   put /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Error not found')
    }
 })
 
// @desc    get logged in user orders
// @route    GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req,res) => {
    const order = await Order.find({user: req.user._id})
    res.json(order) 
 })

// @desc    get lall orders
// @route    GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders) 
 })
 
 // @desc    update order to delivered
// @route   put /api/orders/:id/delivered
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
     
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Error not found')
    }
 })
 export {addOrderItems, getOrderById, updateOrderToPaid,getMyOrders, getOrders,updateOrderToDelivered}