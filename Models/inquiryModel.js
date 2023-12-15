import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  inquiry: { type: String, require: [true, "Inquiry can not be empty !"] },

  createdAt: { type: Date, default: Date.now },

  contactPoint: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

// pre middleware running on all queries starting with "find"
// this keyword points to the current query
inquirySchema.pre(/^find/, function (next) {
  this.populate({ path: "contactPoint", select: "-__v" });
  next();
});

const Inquiry = new mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
