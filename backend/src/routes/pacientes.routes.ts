import { Router } from "express";

import {
  getPacienteById,
  getPacientes,
  updatePaciente,
} from "../controllers/pacientes.controller";

import { authRequired, roleRequired } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/",
  authRequired,
  roleRequired("FUNCIONARIO", "ADMIN"),
  getPacientes,
);

router.get("/:id", authRequired, getPacienteById);

router.put("/:id", authRequired, updatePaciente);

export default router;