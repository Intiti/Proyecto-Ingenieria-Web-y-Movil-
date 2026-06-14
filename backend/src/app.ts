import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { sanitizeInputs } from "./middlewares/sanitize.middleware";
import authRoutes from "./routes/auth.routes";
import pacientesRoutes from "./routes/pacientes.routes";
import solicitudesRoutes from "./routes/solicitudes.routes";
import citasRoutes from "./routes/citas.routes";

const app = express();

// ──────────────────────────────────────────────
// 1. Helmet: cabeceras HTTP seguras
// ──────────────────────────────────────────────
app.use(helmet());

// ──────────────────────────────────────────────
// 2. CORS
// ──────────────────────────────────────────────
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// ──────────────────────────────────────────────
// 3. Rate limiting global (100 req / 15 min)
// ──────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Demasiadas solicitudes. Por favor intenta más tarde.",
  },
});

app.use(globalLimiter);

// ──────────────────────────────────────────────
// 4. Rate limiting estricto para auth (10 / 15 min)
// ──────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message:
      "Demasiados intentos de autenticación. Por favor intenta en 15 minutos.",
  },
});

// ──────────────────────────────────────────────
// 5. Body parser con límite de tamaño
// ──────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));

// ──────────────────────────────────────────────
// 6. Sanitización de inputs contra XSS
// ──────────────────────────────────────────────
app.use(sanitizeInputs);

// ──────────────────────────────────────────────
// Rutas
// ──────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API MuniSalud funcionando correctamente",
  });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/solicitudes", solicitudesRoutes);
app.use("/api/citas", citasRoutes);

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada.",
  });
});

export default app;
