import express from "express";
import Companies from "../controllers/companiesController.js";
import Authentication from "../controllers/authenticationController.js";

const router = express.Router();

router
  .route("/")
  .get(
    Authentication.protect,
    Authentication.restrictTo("User"),
    Companies.getAllCompanies
  );

// For developing purposes
router.route("/new").post(Companies.createCompany);

export default router;
