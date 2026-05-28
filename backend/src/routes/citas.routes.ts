import { Router } from "express";

import {
  createCita,
  deleteCita,
  getCitaById,
  getCitas,
  updateCita,
} from "../controllers/citas.controller";

import { authRequired, roleRequired } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authRequired, roleRequired("FUNCIONARIO", "ADMIN"), getCitas);

router.get("/:id", authRequired, getCitaById);

router.post(
  "/",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  createCita,
);

router.patch(
  "/:id",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  updateCita,
);

router.delete(
  "/:id",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  deleteCita,
);

export default router;