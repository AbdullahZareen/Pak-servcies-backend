import express from "express";
import {
  createMessage,
} from "../controller/chat_controller.js";
import { createRating, getAvgRating } from "../controller/rating_controller.js";
import {
  createMechanic,
  createService,
  getMechanicById,
  getServiceByCity,
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
router.get("/get/getServicesByCity/:city",getServiceByCity)
router.post("/createMechanic", createMechanic);

router.post("/createrating", createRating);
router.post("/login", login);
router.get("/getavgrating/:mechanic_id", getAvgRating);
export default router;
