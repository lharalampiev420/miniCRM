import Estimation from "../Models/estimationModel.js";
import Inquiry from "../Models/inquiryModel.js";

class Estimations {
  createEstimation = async function (req, res, next) {
    try {
      const inquiry = await Inquiry.findById(req.params.inquiriesId);

      if (!inquiry)
        return res
          .status(400)
          .json({ status: "fail", error: "Wrong inquiry ID" });

      const estimation = await Estimation.create({
        estimation: req.body.estimation,
        user: req.user,
        inquiry: req.params.inquiriesId,
      });

      res.status(200).json({ status: "success", estimation });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };
  // Fix
  getAllEstimations = async function (req, res, next) {
    try {
      const estimations = await Estimation.find();
      res.status(400).json({ status: "success", estimations });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  getEstimation = async function (req, res, next) {
    try {
      const estimation = await Estimation.find({ _id: req.params.id }).select(
        "-__v"
      );

      if (!estimation || estimation.length < 1)
        return res
          .status(400)
          .json({ status: "fail", error: "No estimation found !" });

      res.status(200).json({ status: "success", estimation });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  getEstimationsForInquiry = async function (req, res, next) {
    try {
      const estimations = await Estimation.find({
        inquiry: req.params.inquiriesId,
      });

      if (!estimations || estimations.length < 1)
        return res
          .status(400)
          .json({ status: "fail", error: "No estimations for this inquiry !" });

      res.status(400).json({ status: "success", estimations });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  deleteEstimation = async function (req, res, next) {
    try {
      const estimation = await Estimation.findByIdAndDelete(req.params.id);

      if (!estimation)
        return res
          .status(400)
          .json({ status: "fail", error: "No estimation found !" });

      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  updateEstimation = async function (req, res, next) {
    try {
      const estimation = await Estimation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      if (!estimation)
        return res
          .status(400)
          .json({ status: "fail", error: "No estimation found !" });

      res.status(400).json({ status: "success", estimation });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };
}

export default new Estimations();
