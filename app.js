import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./route/appRoute.js";
const myapp = express();
const _cors = cors();
myapp.use(bodyParser.json({ limit: "20mb", extended: true }));
myapp.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
myapp.use(_cors);
myapp.use(router)
export default myapp;
