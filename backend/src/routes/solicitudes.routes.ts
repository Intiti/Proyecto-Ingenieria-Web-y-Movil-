import { Router } from "express";

import {
  createSolicitud,
  deleteSolicitud,
  getMisSolicitudes,
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

// ruta especifica antes de /:id para que no sea capturada como parametro
router.get("/mis-solicitudes", authRequired, getMisSolicitudes);

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