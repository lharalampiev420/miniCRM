import express from "express";
import Views from "../controllers/viewsController.js";
import Authentication from "../controllers/authenticationController.js";

const router = express.Router();

router.get("/", Views.getLoginForm);

router.get(
  "/clients",
  Authentication.protect,
  Authentication.restrictTo("User"),
  Views.getClients
);

router.get(
  "/clients/:query",
  Authentication.protect,
  Authentication.restrictTo("User"),
  Views.getClient
);

router.get("/inquiry", Authentication.protect, Views.getInquiries);

router.get(
  "/inquiry/:id",
  Authentication.protect,
  Authentication.restrictTo("User"),
  Views.getEstimations
);

router.get("*", (req, res) => res.status(400).render("errorView"));

export default router;
