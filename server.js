import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

mongoose.connect(DB, { maxPoolSize: 50 }).then(async () => {
  console.log("DB connection established !");

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
