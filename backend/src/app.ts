import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { sanitizeInputs } from "./middlewares/sanitize.middleware";
import authRoutes from "./routes/auth.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import solicitudesRoutes from "./routes/solicitudes.routes";
import citasRoutes from "./routes/citas.routes";
import examenesRoutes from "./routes/examenes.routes";
import notificacionesRoutes from "./routes/notificaciones.routes";
import serviciosRoutes from "./routes/servicios.routes";
import reportesRoutes from "./routes/reportes.routes";

const app = express();

app.use(helmet());

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// Rate limiting global aumentado para no interferir con la navegación normal
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Demasiadas solicitudes. Por favor intenta mas tarde." },
});

app.use(globalLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(sanitizeInputs);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "API MuniSalud funcionando correctamente" });
});

// El loginLimiter ahora vive dentro de auth.routes.ts, aplicado solo a /login y /register
app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/examenes", examenesRoutes);
app.use("/api/notificaciones", notificacionesRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Ruta no encontrada." });
});

export default app;