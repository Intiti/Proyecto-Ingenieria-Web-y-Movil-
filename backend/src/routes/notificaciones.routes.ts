import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import {
  eliminarNotificacion,
  getMisNotificaciones,
  marcarNotificacionLeida,
} from "../controllers/notificaciones.controller";

const router = Router();

router.get("/mis-notificaciones", authRequired, getMisNotificaciones);

router.patch("/:id/leida", authRequired, marcarNotificacionLeida);

router.delete("/:id", authRequired, eliminarNotificacion);

export default router;