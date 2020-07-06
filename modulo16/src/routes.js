import { Router } from "express";
import Brute from "express-brute";
import BruteRedis from "express-brute-redis";
import multer from "multer";
import multerConfig from "./config/multer";
import FileController from "./app/controllers/FileController";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import authMiddleware from "./app/middlewares/auth";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";

import validateUserStore from "./app/validators/UserStore";
import validateUserUpdate from "./app/validators/UserUpdate";
import validateAuthStore from "./app/validators/AuthStore";
import validateAppointmentStore from "./app/validators/AppointmentStore";

import redisConfig from "./config/redis";

const routes = new Router();
const upload = multer(multerConfig);

// controle de requisições
const bruteStore = new BruteRedis(redisConfig);
const bruteForce = new Brute(bruteStore);

routes.post(
  "/auth",
  bruteForce.prevent,
  validateAuthStore,
  AuthController.store
);

routes.post("/users", validateUserStore, UserController.store);

routes.use(authMiddleware);

routes.put("/users", validateUserUpdate, UserController.update);

routes.post("/files", upload.single("file"), FileController.store);

routes.get("/providers", ProviderController.index);
routes.get("/providers/:providerId/available", ProviderController.available);

routes.get("/appointments", AppointmentController.index);
routes.post(
  "/appointments",
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete("/appointments/:id", AppointmentController.destroy);

routes.get("/schedules", ScheduleController.index);

routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update);

export default routes;
