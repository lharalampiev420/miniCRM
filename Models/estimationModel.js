import mongoose from "mongoose";

const estimationSchema = new mongoose.Schema({
  estimation: { type: String, require: [true, "Estimation required !"] },

  createdAt: { type: Date, default: Date.now },

  inquiry: {
    type: mongoose.Schema.ObjectId,
    ref: "Inquiry",
  },

  user: {},
});

estimationSchema.pre(/^find/, function (next) {
  this.populate({ path: "inquiry", select: "-__v" });
  next();
});

const Estimation = new mongoose.model("Estimation", estimationSchema);

export default Estimation;
