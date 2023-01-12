import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  inquiry: { type: String, require: [true, "Inquiry can not be empty !"] },
  //Date.now()
  createdAt: { type: Date, default: new Date() },
  // fix finish date
  finishUntil: { type: Date, default: new Date() },
  //Relation 1 to 1
  client: {},
  //Relation 1 to many
  estimations: {},
});

const Inquiry = new mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
