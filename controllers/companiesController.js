import Company from "../Models/companyModel.js";

class Companies {
  getAllCompanies = async function (req, res, next) {
    try {
      const companies = await Company.find().select("-__v");
      res.status(200).json({ status: "success", companies });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  createCompany = async function (req, res, next) {
    try {
      const company = await Company.create({
        name: req.body.name,
        email: req.body.email,
        contactPoints: req.body.contactPoints,
      });

      res.status(200).json({ status: "success", company });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };
}

export default new Companies();
