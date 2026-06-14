import { Request, Response, NextFunction } from "express";

/**
 * Elimina caracteres peligrosos de strings para prevenir XSS.
 * Recorre recursivamente body, query y params.
 */
function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
      .trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        sanitizeValue(v),
      ]),
    );
  }
  return value;
}

export const sanitizeInputs = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.body = sanitizeValue(req.body);
  req.query = sanitizeValue(req.query) as typeof req.query;
  req.params = sanitizeValue(req.params) as typeof req.params;
  next();
};
