import express from "express";
import Users from "../controllers/usersController.js";
import Authentication from "../controllers/authenticationController.js";

const router = express.Router();

router.route("/").get(Users.getAllUsers);

router
  .route("/:user")
  .get(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Users.getUser
  );

export default router;
