import mongoose from "mongoose";

const estimationSchema = new mongoose.Schema({
  estimation: { type: String, require: [true, "Estimation required !"] },

  createdAt: { type: Date, default: new Date() },
  // Relation many to 1
  inquiry: {},
  // Relation 1 to 1
  users: {},
});

const Estimation = new mongoose.model("Inquiry", estimationSchema);

export default Estimation;
