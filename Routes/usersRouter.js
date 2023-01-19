import express from "express";
import Users from "../controllers/usersController.js";

const router = express.Router();

router.route("/").get(Users.getAllUsers);

export default router;
