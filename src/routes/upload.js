
import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { fileTypeFromBuffer } from 'file-type';
import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { config } from '../config/config.js';
import { requireAuth } from '../middleware/auth.js';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.maxSize },
});

export const uploadRouter = Router();

uploadRouter.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Falta el archivo' });

    const type = await fileTypeFromBuffer(req.file.buffer);
    if (!type || !ALLOWED.includes(type.mime)) {
      return res.status(415).json({ error: 'Tipo no permitido' });
    }

    const name = `${randomUUID()}.webp`;
    const output = await sharp(req.file.buffer)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    await writeFile(path.join(config.uploadDir, name), output);
    res.json({ url: `${config.publicUrl}/${name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al subir' });
  }
});