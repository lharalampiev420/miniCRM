import express from "express";
import Authentication from "../controllers/authenticationController.js";

const router = express.Router();

router.route("/login").post(Authentication.login);

router.route("/signup").post(Authentication.createUser);

export default router;
