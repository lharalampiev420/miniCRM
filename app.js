import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authenticationRouter from "./Routes/authenticationRouter.js";
import inquiriesRouter from "./Routes/inquiriesRouter.js";
import companiesRouter from "./Routes/companiesRouter.js";
import usersRouter from "./Routes/usersRouter.js";

const app = express();

// Limit requests from same IP
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests! Wait an hour !",
});

app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use("/", limiter);

// debug middleware
app.use((req, res, next) => {
  next();
});

app.use("/auth", authenticationRouter);
app.use("/inquiries", inquiriesRouter);
app.use("/companies", companiesRouter);
app.use("/users", usersRouter);

app.use("*", (req, res) =>
  res.status(404).json({ error: "This route has not been implemented !" })
);

export default app;
