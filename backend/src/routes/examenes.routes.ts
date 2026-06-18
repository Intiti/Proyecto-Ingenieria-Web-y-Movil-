import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware";
import { getMisExamenes } from "../controllers/examenes.controller";

const router = Router();

router.get("/mis-examenes", authRequired, getMisExamenes);

export default router;
