import dotenv from 'dotenv';

dotenv.config();

export function requireAuth(req, res, next) {
  // Aquí valida tu token/sesión real
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  if(req.headers.authorization !== `Bearer ${process.env.ID_TOKEN}`) {
    return res.status(403).json({ error: 'Token inválido' });
  }
  next();
}
