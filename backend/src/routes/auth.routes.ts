import { Router } from "express";
import rateLimit from "express-rate-limit";

import { login, me, registerPatient } from "../controllers/auth.controller";
import { authRequired } from "../middlewares/auth.middleware";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Demasiados intentos de autenticacion. Intenta en 15 minutos." },
});

const router = Router();

router.post("/login", loginLimiter, login);
router.post("/register", loginLimiter, registerPatient);
router.get("/me", authRequired, me); // sin rate limit estricto

export default router;