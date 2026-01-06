import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    problem: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const orderModel = mongoose.models.orders || mongoose.model("orders", orderSchema);
export default orderModel