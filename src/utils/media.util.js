import fs from 'fs';
import path from 'path';
import ApiError from './ApiError.util.js';
import { AVATAR_DIR, POSTS_DIR } from '../config/storage.config.js';

export const deleteFile = async (filename, type) => {
  const dirname = type === 'avatar' ? AVATAR_DIR : POSTS_DIR;

  try {
    await fs.promises.unlink(path.join(dirname, filename));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new ApiError(500, 'File', 'Error deleting file');
    }
  }
};
