import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
import { getFeriadosChile } from "../controllers/servicios.controller";

const router = Router();

router.get("/feriados", authRequired, getFeriadosChile);

export default router;