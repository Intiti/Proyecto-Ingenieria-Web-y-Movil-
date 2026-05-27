import { Router } from "express";

import {
  createSolicitud,
  deleteSolicitud,
  getSolicitudById,
  getSolicitudes,
  updateSolicitud,
} from "../controllers/solicitudes.controller";

import { authRequired, roleRequired } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  getSolicitudes,
);

router.get("/:id", authRequired, getSolicitudById);

router.post(
  "/",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  createSolicitud,
);

router.patch(
  "/:id",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  updateSolicitud,
);

router.delete(
  "/:id",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  deleteSolicitud,
);

export default router;