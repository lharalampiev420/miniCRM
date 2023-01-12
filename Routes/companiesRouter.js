import express from "express";
import Companies from "../controllers/companiesController.js";

const router = express.Router();

router.route("/").get(Companies.getAllCompanies);

router.route("/new").post(Companies.createCompany);

export default router;
