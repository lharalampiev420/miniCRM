import express from "express";
import Inquiries from "../controllers/inquiriesController.js";
import Authentication from "../controllers/authenticationController.js";
import Estimations from "../controllers/estimationsController.js";

const router = express.Router();

router
  .route("/")
  .get(
    Authentication.protect,
    Authentication.restrictTo("Admin", "User", "Client"),
    Inquiries.getAllInquiries
  )
  .post(
    Authentication.protect,
    Authentication.restrictTo("Client"),
    Inquiries.createInquiry
  );

router
  .route("/:id")
  .get(
    Authentication.protect,
    Authentication.restrictTo("Client"),
    Inquiries.getInquiry
  )
  .patch(
    Authentication.protect,
    Authentication.restrictTo("Client"),
    Inquiries.updateInquiry
  )
  .delete(
    Authentication.protect,
    Authentication.restrictTo("Client"),
    Inquiries.deleteInquiry
  );

// estimations

router
  .route("/:inquiriesId/estimations")
  .post(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Estimations.createEstimation
  )
  .get(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Estimations.getEstimationsForInquiry
  );

router
  .route("/:inquiriesId/estimations/:id")
  .get(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Estimations.createEstimation
  )
  .patch(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Estimations.updateEstimation
  )
  .delete(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Estimations.deleteEstimation
  );

router
  .route("/estimations")
  .get(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Estimations.getAllEstimations
  );

export default router;
