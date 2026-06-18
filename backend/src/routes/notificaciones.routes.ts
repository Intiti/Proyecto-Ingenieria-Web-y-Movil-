import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware";
import { getMisNotificaciones, marcarLeida } from "../controllers/notificaciones.controller";

const router = Router();

router.get("/mis-notificaciones", authRequired, getMisNotificaciones);
router.patch("/:id/leida", authRequired, marcarLeida);

export default router;
