import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { bookOrder, orderList, updateStatus, userBookingList } from '../controllers/orderController.js';
import verifyAdmin from '../middleware/verifyadmin.js';

const orderRouter=express.Router();
orderRouter.post("/book-service",authMiddleware,bookOrder)
orderRouter.get("/order-list",verifyAdmin,orderList)
orderRouter.get("/userorder-list",authMiddleware,userBookingList)
orderRouter.post("/update-status/:id",updateStatus)
export default orderRouter;