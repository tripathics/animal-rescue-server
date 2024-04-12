import { join } from 'path';
import { existsSync } from 'fs';
import { AVATAR_DIR, POSTS_DIR } from '../config/storage.config.js';

export const getPostImg = async (req, res) => {
  const { params: { filename } } = req;
  const filepath = join(POSTS_DIR, filename);
  if (existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send('File not found');
  }
};

export const getAvatar = async (req, res) => {
  const { filename } = req.params;
  const filepath = join(AVATAR_DIR, filename);

  if (existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send('File not found');
  }
};
