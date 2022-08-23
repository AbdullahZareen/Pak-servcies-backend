import express from "express";
import {
  createMessage,
  getMessageByCustomerId,
  getMessageByMechanicId,
} from "../controller/chat_controller.js";
import { createRating, getAvgRating } from "../controller/rating_controller.js";
import {
  createMechanic,
  createService,
  getService,
  getMechanicById
} from "../controller/mechanic_controller.js";
import {
  createCustomer,
  getCustomerById,
} from "../controller/customer_controller.js";
import { login } from "../controller/auth_controller.js";
const router = express.Router();
// director's routes are here
router.put("/createservice/:id", createService);
router.post("/createcustomer", createCustomer);
router.get("/getCustomerById/:id", getCustomerById);
router.get("/getMechanicById/:id", getMechanicById);

router.post("/createMechanic", createMechanic);

router.post("/createrating", createRating);
router.get("/getservice", getService);
router.post("/login", login);
router.post("/createmessage", createMessage);
router.get("/getCustomerMessage/:id", getMessageByCustomerId);
router.get("/getMechanicMessage/:id", getMessageByMechanicId);
router.get("/getavgrating/:mechanic_id", getAvgRating);
export default router;
