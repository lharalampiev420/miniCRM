import express from "express";
import Views from "../controllers/viewsController.js";
import Authentication from "../controllers/authenticationController.js";

const router = express.Router();

// router.use(Authentication.isLoggedIn);

router.get("/", Views.getLoginForm);

router.get(
  "/clients",
  Authentication.protect,
  Authentication.restrictTo("User"),
  Views.getClients
);

router.get("/inquiry", Authentication.protect, Views.getInquiries);

router.get(
  "/:id",
  Authentication.protect,
  Authentication.restrictTo("User"),
  Views.getEstimations
);

router.get("*", (req, res) =>
  res.status(404).json({ error: "This route has not been implemented !" })
);

export default router;
