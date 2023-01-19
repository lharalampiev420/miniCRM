import User from "../Models/userModel.js";

class Users {
  getAllUsers = async function (req, res, next) {
    try {
      const users = await User.find().select("-__v");
      res.status(200).json({ status: "success", users });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  getUser = async function (req, res, next) {
    try {
      const users = await User.find({ name: req.params.user }).select("-__v");
      res.status(200).json({ status: "success", users });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };
}

export default new Users();
