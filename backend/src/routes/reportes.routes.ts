import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import { getResumenReportes } from "../controllers/reportes.controller";

const router = Router();

router.get("/resumen", authRequired, getResumenReportes);

export default router;