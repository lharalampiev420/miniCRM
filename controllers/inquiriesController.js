import Inquiry from "../Models/inquiryModel.js";
import jwt from "jsonwebtoken";

class Inquiries {
  test = async function (req, res, next) {
    res.status(200).json({ status: "success", message: "You are logged in !" });
  };
  // For users
  getAllInquiries = async function (req, res, next) {};
  //For Clients
  getOwnInquiries = async function (req, res, next) {};
  //For Clients
  createInquiry = async function (req, res, next) {};
}

export default new Inquiries();
