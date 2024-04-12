import multer from 'multer';
import path from 'path';
import url from 'url';
import fs from 'fs';

const FILENAME = url.fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);

// Ensure the directories for avatars and signs exist
export const AVATAR_DIR = path.join(DIRNAME, '../../media/avatars');
export const POSTS_DIR = path.join(DIRNAME, '../../media/posts');
export const MAX_AVATAR_SIZE = 1024 * 1024 * 2; // 2MB
export const MAX_POST_SIZE = 1024 * 1024 * 2; // 2MB

if (!fs.existsSync(AVATAR_DIR)) {
  fs.mkdirSync(AVATAR_DIR, { recursive: true });
}
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'avatar') {
      cb(null, AVATAR_DIR);
    } else if (file.fieldname === 'pictures') {
      cb(null, POSTS_DIR);
    } else if (file.fieldname === "rescue_pictures") {
      cb(null, POSTS_DIR);
    } else {
      cb('Error: Invalid fieldname!');
    }
  },
  filename(req, file, cb) {
    const now = new Date();
    const userId = req.user.id; // Assuming you have the user ID available in the request object
    const extname = path.extname(file.originalname).toLowerCase();
    cb(null, userId + now.getTime() + extname);
  },
  fileFilter(req, file, cb) {
    const filetypes = /png|jpg|jpeg|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Only .png, .jpg, and .webp files are allowed!');
  },
});

export default storage;
