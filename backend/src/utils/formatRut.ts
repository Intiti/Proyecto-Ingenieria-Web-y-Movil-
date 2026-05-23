export const cleanRut = (rut: string) => {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
};

export const formatRut = (rut: string) => {
  const cleaned = cleanRut(rut);

  if (cleaned.length <= 1) {
    return cleaned;
  }

  const body = cleaned.slice(0, -1);
  const verifier = cleaned.slice(-1);

  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedBody}-${verifier}`;
};