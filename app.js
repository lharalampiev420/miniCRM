import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import authenticationRouter from "./Routes/authenticationRouter.js";
import inquiriesRouter from "./Routes/inquiriesRouter.js";
import companiesRouter from "./Routes/companiesRouter.js";
import usersRouter from "./Routes/usersRouter.js";
import viewsRouter from "./Routes/viewsRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("Views", path.join(__dirname, "Views"));

app.use(express.static(path.join(__dirname, "Public")));

// Limit requests from same IP
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests! Wait an hour !",
});

app.use(cors());
app.options("*", cors());

app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use("/", limiter);
app.use(compression());

app.use("/api/inquiries", inquiriesRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

app.use("*", (req, res) =>
  res.status(404).json({ error: "This route has not been implemented !" })
);

export default app;
