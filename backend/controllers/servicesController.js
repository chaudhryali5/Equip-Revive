import Services from "../models/servicesSchema.js";
import { cloudinary } from "../config/cloudinary.js";

export const addService = async (req, res) => {
    if (!req.file) {
        return res.send({ status: false, message: "Please upload a file!" })
    }

    try {
        const serviceData = req.body;
        const image_filename = req.file.path;

        console.log("Image uploaded to Cloudinary:", image_filename);

        const service = new Services({
            name: serviceData.name,
            price: serviceData.price,
            description: serviceData.description,
            category: serviceData.category,
            image: image_filename
        });

        await service.save();
        console.log("Service saved successfully:", service);
        res.send({ status: true, message: "Service added successfully!" })

    } catch (error) {
        console.log("Error adding service:", error);
        res.send({ status: false, message: error.message })
    }
}

export const listServices = async (req, res) => {
    try {
        const services = await Services.find()
        res.send({ status: true, message: "Services fetched successfully!", services })
    } catch (error) {
        console.log(error);
        res.send({ status: false, message: "Something went wrong!" })

    }
}


export const removeService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Services.findByIdAndDelete(id);

        if (!service) {
            return res.send({
                status: false,
                message: "Service not found"
            });
        }

        // Delete image from Cloudinary 
        if (service.image && service.image.includes("cloudinary")) {
            try {

                const urlParts = service.image.split('/');
                const uploadIndex = urlParts.indexOf('upload');

                if (uploadIndex !== -1) {

                    const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
                    // Remove file extension to get public_id
                    const publicId = pathAfterUpload.substring(0, pathAfterUpload.lastIndexOf('.'));

                    console.log("Attempting to delete from Cloudinary:", publicId);

                    const result = await cloudinary.uploader.destroy(publicId);
                    console.log("Cloudinary deletion result:", result);

                    if (result.result !== 'ok') {
                        console.warn("Cloudinary deletion may have failed:", result);
                    }
                } else {
                    console.warn("Could not parse Cloudinary URL:", service.image);
                }
            } catch (err) {
                console.error("Cloudinary delete error:", err);
            }
        }

        return res.send({
            status: true,
            message: "Service and image deleted successfully"
        });

    } catch (error) {
        console.error("Remove Service Error:", error);
        return res.send({
            status: false,
            message: "Server error while deleting service"
        });
    }
};