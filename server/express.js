import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import models from "./model";
import router from "./router";

const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// use helmet spy bisa dikenali SEO
app.use(helmet());
// secure apps by setting various HTTP headers
app.use(compress());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//comment script dibawah before building for production
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/hr/api/v1/test", (req, res) => {
  res.send("Hello HR-Fullstack II");
});

// #middleware
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

app.use("/api/users", router.route_user);
app.use("/api/address", router.route_addr);
app.use("/api/bank", router.route_bank);
app.use("/api/baac", router.route_baac);
app.use("/api/paac", router.route_paac);
app.use("/api/payt", router.route_payt);

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
