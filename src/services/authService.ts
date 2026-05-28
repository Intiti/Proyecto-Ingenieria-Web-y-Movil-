import { apiRequest } from "./api";

type LoginPayload = {
  identificador: string;
  password: string;
};

type LoginResponse = {
  ok: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    rut: string;
    nombre: string;
    correo: string;
    rol: "PACIENTE" | "FUNCIONARIO" | "ADMIN";
    pacienteId?: string | null;
    funcionarioId?: string | null;
  };
};

type MeResponse = {
  ok: boolean;
  user: {
    id: string;
    rut: string;
    nombre: string;
    correo: string;
    rol: "PACIENTE" | "FUNCIONARIO" | "ADMIN";
    paciente?: unknown;
    funcionario?: unknown;
  };
};

type RegisterPayload = {
  rut: string;
  nombre: string;
  correo: string;
  password: string;
  telefono?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
};

type RegisterResponse = {
  ok: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    rut: string;
    nombre: string;
    correo: string;
    rol: "PACIENTE" | "FUNCIONARIO" | "ADMIN";
    pacienteId?: string | null;
  };
};

export const loginRequest = async (payload: LoginPayload) => {
  const response = await apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("munisalud_token", response.token);
  localStorage.setItem("munisalud_user", JSON.stringify(response.user));

  return response;
};

export const meRequest = async () => {
  return apiRequest<MeResponse>("/auth/me");
};

export const registerRequest = async (payload: RegisterPayload) => {
  const response = await apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  localStorage.setItem("munisalud_token", response.token);
  localStorage.setItem("munisalud_user", JSON.stringify(response.user));

  return response;
};

export const logout = () => {
  localStorage.removeItem("munisalud_token");
  localStorage.removeItem("munisalud_user");
  sessionStorage.clear();
};