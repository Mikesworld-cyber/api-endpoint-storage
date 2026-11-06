import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3005,
  uploadDir: process.env.UPLOAD_DIR || '/var/www/uploads',
  publicUrl: process.env.PUBLIC_URL, // https://tudominio.com/uploads
  allowedOrigin: process.env.ALLOWED_ORIGIN,
  maxSize: 10 * 1024 * 1024,
};