import orderModel from "../models/orderSchema.js";
import Services from "../models/servicesSchema.js";

export const bookOrder = async (req, res) => {
    try {
        const { serviceId, name, phone, date, address, problem, userId } = req.body;
        if (!serviceId || !name || !phone || !date || !address || !problem) {
            return res.send({ status: false, message: "All fields are required!" })
        }
        const order = new orderModel({
            serviceId,
            name,
            phone,
            date,
            address,
            problem,
            userId
        })
        await order.save();
        res.send({ status: true, message: "Service bookedsuccessfully!" })

    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "something went wrong!" })

    }
}

export const userBookingList = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("Fetching orders for UserID:", userId);
        if (!userId) {
            return res.send({ status: false, message: "User ID not found. Please login again." })
        }

        const orders = await orderModel.find({ userId })
        const ordersWithService = await Promise.all(
            orders.map(async (order) => {
                const service = await Services.findById(order.serviceId);
                return {
                    ...order.toObject(),
                    serviceName: service?.name || "Unknown Service",
                    category: service?.category || "General"
                };
            })
        );

        res.send({ status: true, data: ordersWithService })
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "something went wrong!" })
    }
}

export const orderList = async (req, res) => {
    try {
        const orders = await orderModel.find({})

        const ordersWithService = await Promise.all(
            orders.map(async (order) => {
                const service = await Services.findById(order.serviceId);
                return {
                    ...order.toObject(),
                    serviceName: service?.name || "Unknown Service",
                    category: service?.category || "General"
                };
            })
        );

        res.send({ status: true, data: ordersWithService })

    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "something went wrong!" })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await orderModel.findByIdAndUpdate(id, { status })
        if (!order) {
            return res.send({ status: false, message: "status not updated!" })
        }
        res.send({ status: true, message: "nooking status updated successfully!" })
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "something went wrong!" })
    }
}