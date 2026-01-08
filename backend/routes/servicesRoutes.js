import express from "express";
import { addService, listServices, removeService } from "../controllers/servicesController.js";
 import multer from "multer";
 import { storage } from '../config/cloudinary.js';
import verifyAdmin from "../middleware/verifyadmin.js";

const upload = multer({ storage: storage });

const serviceRouter = express.Router();

serviceRouter.post('/addService',upload.single('image'), verifyAdmin, addService);
serviceRouter.get('/listServices', listServices);
serviceRouter.delete('/removeService/:id', verifyAdmin, removeService);

export default serviceRouter;