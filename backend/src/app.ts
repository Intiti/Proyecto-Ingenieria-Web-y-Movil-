import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import pacientesRoutes from "./routes/pacientes.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API MuniSalud funcionando correctamente",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacientesRoutes);

app.use((_req, res) => {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada.",
  });
});

export default app;