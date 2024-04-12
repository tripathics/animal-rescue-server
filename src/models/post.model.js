import db from '../config/db.config.js'

class Post {
  static async create(user_id, description, post_type = 'post', pictures = null) {
    const { rowCount } = await db.query(`
      INSERT INTO posts (user_id, description, pictures, post_type)
      VALUES ($1, $2, $3, $4)
    `, [user_id, description, pictures, post_type]);
    return rowCount > 0;
  }

  static async find() {
    const { rows } = await db.query(`
    SELECT posts.*, profiles.first_name, profiles.last_name, profiles.avatar
    FROM posts LEFT JOIN profiles ON posts.user_id = profiles.user_id`);
    return rows;
  }
}

export default Post;