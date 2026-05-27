import { Router } from "express";

import { login, me, registerPatient } from "../controllers/auth.controller";
import { authRequired } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", registerPatient);
router.get("/me", authRequired, me);

export default router;
