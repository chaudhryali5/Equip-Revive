import express from "express";
import { googleLogin } from "../controllers/googleController.js";

const googleRouter = express.Router();


googleRouter.post('/google/login', googleLogin);

export default googleRouter;