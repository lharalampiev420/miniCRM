import express from "express";
import Inquiries from "../controllers/inquiriesController.js";
import Authentication from "../controllers/authenticationController.js";

const router = express.Router();

router
  .route("/")
  .get(
    Authentication.protect,
    Authentication.restrictTo("Admin", "Client"),
    Inquiries.test
  );

export default router;
