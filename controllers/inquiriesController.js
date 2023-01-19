import Inquiry from "../Models/inquiryModel.js";
import Estimation from "../Models/estimationModel.js";

class Inquiries {
  getAllInquiries = async function (req, res, next) {
    try {
      const inquiries = await Inquiry.find().select("-__v");
      res.status(200).json({ status: "success", inquiries });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  getInquiry = async function (req, res, next) {
    try {
      const inquiry = await Inquiry.find({ _id: req.params.id }).select("-__v");

      if (!inquiry || inquiry.length < 1)
        return res
          .status(400)
          .json({ status: "fail", error: "No inquiry found !" });

      res.status(200).json({ status: "success", inquiry });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  createInquiry = async function (req, res, next) {
    try {
      const inquiry = await Inquiry.create({
        inquiry: req.body.inquiry,
        contactPoint: req.user._id,
      });

      res.status(200).json({ status: "success", inquiry });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  deleteInquiry = async function (req, res, next) {
    try {
      const estimation = await Estimation.deleteMany({
        inquiry: req.params.id,
      });
      const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

      if (!inquiry)
        return res
          .status(400)
          .json({ status: "fail", error: "No inquiry found !" });

      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  updateInquiry = async function (req, res, next) {
    try {
      const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!inquiry)
        return res
          .status(400)
          .json({ status: "fail", error: "No inquiry found !" });

      res.status(400).json({ status: "success", inquiry });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };
}

export default new Inquiries();
