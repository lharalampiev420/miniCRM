import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Client name is required !"],
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Client email is required !"],
  },

  // Ref to all users with role Client for the current company
  contactPoints: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

  // TODO
  inquiries: {},
});

// pre middleware running on all queries starting with "find"
// this keyword points to the current query
companySchema.pre(/^find/, function (next) {
  this.populate({ path: "contactPoints", select: "-__v -company" });
  next();
});

const Company = new mongoose.model("Company", companySchema);

export default Company;
