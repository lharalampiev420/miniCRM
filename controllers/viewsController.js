import Inquiry from "../Models/inquiryModel.js";
import Estimation from "../Models/estimationModel.js";
import User from "../Models/userModel.js";
import Company from "../Models/companyModel.js";

class Views {
  getInquiries = async function (req, res, next) {
    try {
      if (req.user.role === "Client") {
        const inquiries = await Inquiry.find();
        res.status(200).render("clientInquiry", { inquiries, user: req.user });
      } else {
        const inquiries = await Inquiry.find();
        res.status(200).render("userInquiry", { inquiries, user: req.user });
      }
    } catch (error) {
      res.status(400).render("errorView");
    }
  };

  getLoginForm = async function (req, res, next) {
    try {
      res.status(200).render("login");
    } catch (error) {
      res.status(200).render("login", error);
    }
  };

  getEstimations = async function (req, res, next) {
    try {
      const estimations = await Estimation.find({
        inquiry: req.params.id,
      });

      res.status(200).render("estimations", {
        estimations,
        inquiryId: req.params.id,
        logUserEmail: req.user.email,
        user: req.user,
      });
    } catch (error) {
      res.status(400).render("errorView");
    }
  };

  getClients = async function (req, res, next) {
    try {
      const users = await User.find({ role: "Client" });

      res.status(200).render("clientsList", { users, user: req.user });
    } catch (error) {
      res.status(400).render("errorView");
    }
  };

  getClient = async function (req, res, next) {
    try {
      const users = await User.find({ name: req.params.query, role: "Client" });

      res.status(200).render("clientsList", { users, user: req.user });
    } catch (error) {
      res.status(400).render("errorView");
    }
  };
}

export default new Views();
