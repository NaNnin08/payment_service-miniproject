import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";

import helmet from "helmet";

import models from "./model";
import router from "./router";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";

import dotenv from "dotenv";

dotenv.config();

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

// 1. client-side
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import { StaticRouter } from "react-router-dom";
import Template from "./../template";
import { Provider } from "react-redux";
import store from "../client/store.js";

//comment script dibawah before building for production
import devBundle from "./devBundle";

// client-side : gunakan ketika development only
devBundle.compile(app);

//comment script dibawah before building for production
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/hr/api/v1/test", (req, res) => {
  res.send("Hello HR-Fullstack");
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
app.use("/api/payment/save", router.route_pays);
app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 2. Client-Side : ReactDOMServer.
app.get("*", (req, res) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <MainRouter />
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }

  res.status(200).send(Template());
});

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
