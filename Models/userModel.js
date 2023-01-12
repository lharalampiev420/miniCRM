import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: ["true", "Name is required !"],
  },

  email: {
    type: String,
    unique: true,
    required: ["true", "Email is required !"],
  },

  position: { type: String, required: ["true", "Position is required !"] },

  password: {
    type: String,
    minlength: 8,
    required: ["true", "Password is required !"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: ["true", "Password confirmation is required !"],
    // Works only on .Save or .Create and not on Update queries
    validate: {
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
    },
  },

  role: {
    type: String,
    enum: ["Client", "User"],
    required: ["true", "Role is required !"],
  },

  // Ref to the clients's company
  company: [{ type: mongoose.Schema.ObjectId, ref: "Company" }],

  // TODO
  estimations: {},
});

// Pre middleware running on save/create and hashing the password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// pre middleware running on all queries starting with "find"
// this keyword points to the current query
userSchema.pre(/^find/, function (next) {
  this.populate({ path: "company", select: "-__v -contactPoints" });
  next();
});

// Instance method available on documents
userSchema.methods.comparePassword = async function (candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
