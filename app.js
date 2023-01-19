import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";

import authenticationRouter from "./Routes/authenticationRouter.js";
import inquiriesRouter from "./Routes/inquiriesRouter.js";
import companiesRouter from "./Routes/companiesRouter.js";
import usersRouter from "./Routes/usersRouter.js";
import viewsRouter from "./Routes/viewsRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("Views", "./Views");

app.use(express.static("./Public"));

// Limit requests from same IP
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests! Wait an hour !",
});

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use("/", limiter);

app.use("/api/inquiries", inquiriesRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

app.use("*", (req, res) =>
  res.status(404).json({ error: "This route has not been implemented !" })
);

export default app;
