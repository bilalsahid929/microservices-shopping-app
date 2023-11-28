import express, { json, urlencoded } from "express";
import path from "path";
import cors from "cors";

import { products, appEvents } from "./api/index.js";
import HandleErrors from "./utils/error-handler.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default async (app) => {
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //listeners
  appEvents(app);
  //api

  products(app);

  // error handling
  app.use(HandleErrors);
};
